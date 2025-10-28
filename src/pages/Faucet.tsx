import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  AlertCircle,
  CheckCircle,
  Loader2,
  DollarSign,
  Info,
  Copy,
  Check,
  Wallet
} from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useFaucet } from "@/hooks/useFaucet";
import { usePresaleManager } from "@/hooks/usePresaleManager";
import { getContractAddresses } from "@/lib/contracts";
import { useNavigate } from "react-router-dom";

const Faucet = () => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const { address, isConnected, connect, disconnect, chain } = useWallet();
  const { mintTestUSDC, transactionStatus, isPending, isConfirming, isConfirmed } = useFaucet();
  const { balance, refetchBalance } = usePresaleManager();
  const contracts = getContractAddresses(chain?.id);

  // Refetch balance when transaction is confirmed
  useEffect(() => {
    if (isConfirmed) {
      console.log('🔄 Refreshing balance after faucet claim...')
      refetchBalance()
    }
  }, [isConfirmed, refetchBalance])

  // Debug balance
  useEffect(() => {
    console.log('💰 Current Balance:', balance)
    console.log('🌐 Chain ID:', chain?.id)
    console.log('📍 Contract Address:', contracts.USDC)
  }, [balance, chain?.id, contracts.USDC])

  const handleMint = async () => {
    try {
      await mintTestUSDC();
    } catch (error) {
      console.error('Error minting test USDC:', error);
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Droplets className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Test USDT Faucet
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get free test USDT tokens to try out the platform.
              Perfect for testing all functionalities!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Faucet Panel */}
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Mint Test USDT
              </h2>

              {!isConnected ? (
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Connect Your Wallet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Connect your wallet to get test USDT tokens.
                  </p>
                  <Button onClick={connect} size="lg" className="w-full">
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                </div>
              ) : chain?.id !== 56 ? (
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Wrong Network
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Please switch to BSC Mainnet (Chain ID: 8453) to use the faucet.
                    <br />
                    Current network: {chain?.name} (ID: {chain?.id})
                  </p>
                  <Button onClick={connect} size="lg" className="w-full">
                    <Wallet className="w-4 h-4 mr-2" />
                    Switch Network
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Wallet Info */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Connected Wallet</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => disconnect()}
                        className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                      >
                        Disconnect
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm text-foreground">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={copyAddress}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Current Balance */}
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-primary mr-2" />
                        <span className="text-sm font-medium text-foreground">Current Balance</span>
                      </div>
                      <span className="text-lg font-bold text-primary">
                        ${balance.toFixed(2)} USDT
                      </span>
                    </div>
                  </div>

                  {/* Network Info */}
                  {chain && (
                    <div className="bg-muted/30 rounded-lg p-4 border">
                      <div className="text-xs text-muted-foreground mb-1">Network</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{chain.name}</Badge>
                        <span className="text-sm text-muted-foreground">ID: {chain.id}</span>
                      </div>
                    </div>
                  )}

                  {/* Contract Info */}
                  <div className="bg-muted/30 rounded-lg p-4 border">
                    <div className="text-xs text-muted-foreground mb-1">TestUSDT Contract</div>
                    <div className="font-mono text-xs text-foreground break-all">
                      {contracts.USDC}
                    </div>
                  </div>

                  {/* Transaction Status */}
                  {transactionStatus.message && (
                    <div className={`p-4 rounded-lg border ${transactionStatus.status === 'success'
                      ? 'bg-success/10 border-success/20'
                      : transactionStatus.status === 'error'
                        ? 'bg-destructive/10 border-destructive/20'
                        : 'bg-primary/10 border-primary/20'
                      }`}>
                      <div className="flex items-center">
                        {transactionStatus.status === 'success' ? (
                          <CheckCircle className="h-5 w-5 text-success mr-3" />
                        ) : transactionStatus.status === 'error' ? (
                          <AlertCircle className="h-5 w-5 text-destructive mr-3" />
                        ) : (
                          <Loader2 className="h-5 w-5 text-primary mr-3 animate-spin" />
                        )}
                        <span className="text-sm font-medium">
                          {transactionStatus.message}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Mint Button */}
                  <Button
                    onClick={handleMint}
                    disabled={isPending || isConfirming}
                    size="lg"
                    className="w-full"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Requesting...
                      </>
                    ) : isConfirming ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      <>
                        <Droplets className="h-5 w-5 mr-2" />
                        Mint 1,000 Test USDT
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Card>

            {/* Info Panel */}
            <div className="space-y-6">
              {/* How it Works */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  How it Works
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Connect your wallet to the test network
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Click "Mint Test USDT" to get 1,000 tokens
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Use test USDT to trade and contribute
                    </p>
                  </div>
                </div>
              </Card>

              {/* Test Features */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Test Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3" />
                    <span className="text-sm text-muted-foreground">Create presales with test USDT</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3" />
                    <span className="text-sm text-muted-foreground">Contribute to existing presales</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3" />
                    <span className="text-sm text-muted-foreground">Test USDT approval flow</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-3" />
                    <span className="text-sm text-muted-foreground">Experience full presale lifecycle</span>
                  </div>
                </div>
              </Card>

              {/* Important Notes */}
              <Card className="p-6 bg-yellow-500/10 border-yellow-500/20">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-800 mb-2">
                      Important Notes
                    </h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Test USDT has no real value</li>
                      <li>• Tokens are only for testing purposes</li>
                      <li>• You can mint multiple times if needed</li>
                      <li>• Balance resets when switching networks</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => navigate("/create-market")}
                  >
                    <span>Create Market</span>
                    <span className="text-xs text-muted-foreground">→</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => navigate("/?tab=launchpad")}
                  >
                    <span>Browse Launchpad</span>
                    <span className="text-xs text-muted-foreground">→</span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Faucet;

