import EmailLinkDialog from '@/components/EmailLinkDialog'
import { useEmailLinkDialog } from '@/hooks/useEmailLinkDialog'

const EmailLinkDialogWrapper = () => {
  const { showDialog, closeDialog, handleEmailLinked, walletAddress, clearDialogHistory } = useEmailLinkDialog()

  // Exposer la fonction de debug sur window pour pouvoir l'appeler depuis la console
  if (typeof window !== 'undefined') {
    (window as any).clearEmailDialogHistory = clearDialogHistory
  }

  if (!walletAddress) {
    return null
  }

  return (
    <EmailLinkDialog
      open={showDialog}
      onOpenChange={closeDialog}
      walletAddress={walletAddress}
      onEmailLinked={handleEmailLinked}
    />
  )
}

export default EmailLinkDialogWrapper
