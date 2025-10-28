import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // Check if it's the JSBI BigInt error
        if (error.message && error.message.includes('BigInt is not a function')) {
            console.error('🔴 JSBI BigInt error detected - this is a known issue with Uniswap SDK');
            console.error('The app will continue to work, but some features may be limited');
        }

        this.setState({
            error,
            errorInfo
        });
    }

    private handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            // Check if it's the BigInt error
            const isBigIntError = this.state.error?.message?.includes('BigInt is not a function');

            if (isBigIntError) {
                // For BigInt errors, show a minimal error that doesn't break the page
                return (
                    <div className="min-h-screen bg-background flex items-center justify-center p-4">
                        <div className="max-w-md w-full bg-card border border-border rounded-lg p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertCircle className="h-6 w-6 text-yellow-500" />
                                <h2 className="text-xl font-semibold">Loading Issue</h2>
                            </div>

                            <p className="text-muted-foreground mb-4">
                                There was a temporary issue loading some features. This is usually resolved by refreshing the page.
                            </p>

                            <div className="flex gap-2">
                                <Button onClick={this.handleReload} className="flex-1">
                                    Refresh Page
                                </Button>
                                <Button
                                    onClick={() => this.setState({ hasError: false })}
                                    className="flex-1 border border-input bg-background hover:bg-accent"
                                >
                                    Continue Anyway
                                </Button>
                            </div>

                            {process.env.NODE_ENV === 'development' && (
                                <details className="mt-4 text-xs">
                                    <summary className="cursor-pointer text-muted-foreground">
                                        Technical Details
                                    </summary>
                                    <pre className="mt-2 p-2 bg-muted rounded overflow-auto">
                                        {this.state.error?.message}
                                    </pre>
                                </details>
                            )}
                        </div>
                    </div>
                );
            }

            // For other errors, show a more detailed error page
            return (
                <div className="min-h-screen bg-background flex items-center justify-center p-4">
                    <div className="max-w-2xl w-full bg-card border border-border rounded-lg p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="h-6 w-6 text-destructive" />
                            <h2 className="text-xl font-semibold">Something went wrong</h2>
                        </div>

                        <p className="text-muted-foreground mb-4">
                            An unexpected error occurred. Please try refreshing the page.
                        </p>

                        <div className="flex gap-2 mb-4">
                            <Button onClick={this.handleReload} className="flex-1">
                                Refresh Page
                            </Button>
                            <Button
                                onClick={() => this.setState({ hasError: false })}
                                className="flex-1 border border-input bg-background hover:bg-accent"
                            >
                                Try Again
                            </Button>
                        </div>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-4">
                                <summary className="cursor-pointer text-sm text-muted-foreground mb-2">
                                    Error Details
                                </summary>
                                <div className="bg-muted p-4 rounded-lg overflow-auto">
                                    <p className="text-sm font-mono text-destructive mb-2">
                                        {this.state.error.message}
                                    </p>
                                    <pre className="text-xs text-muted-foreground overflow-auto">
                                        {this.state.error.stack}
                                    </pre>
                                </div>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

