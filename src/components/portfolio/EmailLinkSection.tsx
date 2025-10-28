import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react'
import { useUserPoints } from '@/hooks/useUserPoints'
import { useWallet } from '@/hooks/useWallet'
import EmailLinkDialog from '@/components/EmailLinkDialog'

const EmailLinkSection = () => {
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const { address } = useWallet()
  const { points, isLoading } = useUserPoints(address)

  const handleEmailLinked = () => {
    setShowEmailDialog(false)
  }

  // Si l'email est déjà lié, ne pas afficher la section
  if (points?.email) {
    return null
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Link Your Email
            </div>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardTitle>
          <CardDescription>
            Connect your email to access waitlist benefits and notifications
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Security Note */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-sm">
                <p className="text-muted-foreground">
                  Your email will be verified for security. Only one email can be linked per wallet.
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => setShowEmailDialog(true)}
            className="w-full"
          >
            <Mail className="h-4 w-4 mr-2" />
            Link Email
          </Button>
        </CardContent>
      </Card>

      {/* Email Link Dialog */}
      <EmailLinkDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        walletAddress={address || ''}
        onEmailLinked={handleEmailLinked}
      />
    </>
  )
}

export default EmailLinkSection
