import { useState, useEffect } from 'react'
import { useWallet } from './useWallet'
import { useUserPoints } from './useUserPoints'

export function useEmailLinkDialog() {
  const [showDialog, setShowDialog] = useState(false)
  const [hasShownDialog, setHasShownDialog] = useState(false)
  
  const { isConnected, address } = useWallet()
  const { points, isLoading: pointsLoading } = useUserPoints(address)

  useEffect(() => {
    // EMAIL VERIFICATION DIALOG DISABLED
    // Users can still link their email manually from the Portfolio page
    // This prevents the automatic popup on first connection
  }, [isConnected, address, hasShownDialog, points?.email, pointsLoading])

  const openDialog = () => {
    setShowDialog(true)
  }

  const closeDialog = () => {
    setShowDialog(false)
  }

  const handleEmailLinked = () => {
    setShowDialog(false)
  }

  // Fonction pour nettoyer le localStorage (pour debug)
  const clearDialogHistory = () => {
    if (address) {
      localStorage.removeItem(`emailDialogShown_${address}`)
      setHasShownDialog(false)
      console.log('Dialog history cleared for address:', address)
    }
  }

  return {
    showDialog,
    openDialog,
    closeDialog,
    handleEmailLinked,
    walletAddress: address,
    clearDialogHistory // Exposer pour debug
  }
}
