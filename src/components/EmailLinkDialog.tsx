import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { ERROR_MESSAGES, formatErrorMessage, logError } from '@/lib/errorMessages'

interface EmailLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  walletAddress: string
  onEmailLinked?: (email: string) => void
}

const EmailLinkDialog = ({ 
  open, 
  onOpenChange, 
  walletAddress,
  onEmailLinked 
}: EmailLinkDialogProps) => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const handleSendVerification = async () => {
    if (!email || !email.includes('@')) {
      toast.error(ERROR_MESSAGES.AUTH.INVALID_EMAIL)
      return
    }

    setIsLoading(true)
    try {
      // Check if email is already linked to another wallet
      const { data: existingUser, error: checkError } = await supabase
        .from('user_points')
        .select('wallet_address')
        .eq('email', email.toLowerCase())
        .neq('wallet_address', walletAddress.toLowerCase())

      if (checkError) {
        logError('EmailLinkDialog.checkEmail', checkError, { email, walletAddress })
        throw checkError
      }

      if (existingUser && existingUser.length > 0) {
        toast.error('This email is already linked to another wallet')
        return
      }

      // Get user's referral code for the email
      const { data: userData, error: userError } = await supabase
        .from('user_points')
        .select('referral_code, referred_by')
        .eq('wallet_address', walletAddress.toLowerCase())
        .single()

      if (userError) {
        logError('EmailLinkDialog.getUserData', userError, { walletAddress })
        throw userError
      }

      // Generate verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
      
      // Store verification code in database using upsert to handle duplicates
      const { error: upsertError } = await supabase
        .from('email_verifications')
        .upsert({
          wallet_address: walletAddress.toLowerCase(),
          email: email.toLowerCase(),
          verification_code: verificationCode,
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
        }, {
          onConflict: 'wallet_address,email'
        })

      if (upsertError) {
        logError('EmailLinkDialog.storeVerification', upsertError, { email, walletAddress })
        throw upsertError
      }

      // Send verification email via Supabase Edge Function
      const { data: emailResponse, error: emailError } = await supabase.functions.invoke('send-verification-email', {
        body: {
          email: email.toLowerCase(),
          walletAddress: walletAddress.toLowerCase(),
          verificationCode: verificationCode,
          ownReferralCode: userData?.referral_code || null,
          referredBy: userData?.referred_by || null
        }
      })

      if (emailError) {
        logError('EmailLinkDialog.sendEmailFunction', emailError, { email, walletAddress })
        throw emailError
      }

      if (!emailResponse?.success) {
        throw new Error(emailResponse?.error || 'Failed to send verification email')
      }

      toast.success('Verification email sent! Check your inbox.')
      setVerificationSent(true)
      
      // For testing purposes, show the verification code in console
      console.log('Verification code (for testing):', verificationCode)
    } catch (error) {
      logError('EmailLinkDialog.sendVerification', error, { email, walletAddress })
      const errorMessage = formatErrorMessage(error, 'Failed to send verification email')
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyEmail = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit verification code')
      return
    }

    setIsVerifying(true)
    try {
      // Verify the code
      const { data: verification, error: verifyError } = await supabase
        .from('email_verifications')
        .select('*')
        .eq('wallet_address', walletAddress.toLowerCase())
        .eq('email', email.toLowerCase())
        .eq('verification_code', verificationCode)
        .gt('expires_at', new Date().toISOString())
        .single()

      if (verifyError || !verification) {
        toast.error('Invalid or expired verification code')
        return
      }

      // Update user_points with verified email
      const { error: updateError } = await supabase
        .from('user_points')
        .update({
          email: email.toLowerCase()
        })
        .eq('wallet_address', walletAddress.toLowerCase())

      if (updateError) {
        logError('EmailLinkDialog.updateUser', updateError, { email, walletAddress })
        throw updateError
      }

      // Clean up verification record
      await supabase
        .from('email_verifications')
        .delete()
        .eq('wallet_address', walletAddress.toLowerCase())
        .eq('email', email.toLowerCase())

      toast.success('Email successfully linked to your wallet!')
      onEmailLinked?.(email.toLowerCase())
      onOpenChange(false)
      
      // Reset form
      setEmail('')
      setVerificationSent(false)
      setVerificationCode('')
    } catch (error) {
      logError('EmailLinkDialog.verifyEmail', error, { email, walletAddress, verificationCode })
      const errorMessage = formatErrorMessage(error, 'Failed to verify email')
      toast.error(errorMessage)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendCode = async () => {
    setVerificationSent(false)
    setVerificationCode('')
    await handleSendVerification()
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset form when closing
    setEmail('')
    setVerificationSent(false)
    setVerificationCode('')
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Link Email to Wallet
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!verificationSent ? (
            <>
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Link an email to your wallet for notifications and waitlist benefits
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This email will be linked to your wallet and cannot be used by another wallet.
                  You'll receive a verification email to confirm ownership.
                </AlertDescription>
              </Alert>

              <Button 
                onClick={handleSendVerification} 
                disabled={isLoading || !email}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Verification Email
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="text-center space-y-2">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                <p className="font-medium">Verification email sent!</p>
                <p className="text-sm text-muted-foreground">
                  Check your inbox and enter the 6-digit code below
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="verification-code">Verification Code</Label>
                <Input
                  id="verification-code"
                  type="text"
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  disabled={isVerifying}
                  maxLength={6}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleVerifyEmail} 
                  disabled={isVerifying || verificationCode.length !== 6}
                  className="flex-1"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify Email
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={handleResendCode} 
                  variant="outline"
                  disabled={isLoading}
                >
                  Resend
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EmailLinkDialog
