import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Security: only log detailed error info in development.
    // In production, no stack traces are written to the console.
    if (import.meta.env.DEV) {
      console.error("Uncaught error:", error, errorInfo);
    }
  }

  private handleReset = () => {
    (this as any).setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleGoHome = () => {
    (this as any).setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6 text-white font-sans relative overflow-hidden">
          {/* Subtle tech grid background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          {/* Glowing Red Background Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative max-w-lg w-full text-center space-y-8 p-8 rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-md">
            
            {/* Warning Icon with pulse glow */}
            <div className="flex justify-center">
              <div className="p-5 bg-red-500/10 text-[#e63946] rounded-full border border-[#e63946]/20 shadow-[0_0_24px_rgba(230,57,70,0.15)] animate-pulse">
                <AlertTriangle size={48} />
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-[#e63946] tracking-[0.25em] uppercase">
                SYSTEM EXCEPTION DETECTED
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                An Error Occurred
              </h1>
              <p className="font-sans text-sm text-neutral-400 leading-relaxed max-w-md mx-auto">
                We apologize for the interruption. The performance engine encountered an unexpected runtime exception.
              </p>
            </div>

            {/* Error Message display box */}
            {this.state.error && (
              <div className="p-4 bg-black/60 rounded-xl border border-white/5 text-left font-mono text-[11px] text-red-400/80 max-h-[120px] overflow-y-auto space-y-1 scrollbar-thin">
                <div className="font-bold uppercase tracking-wider text-white/40 mb-1">Stack Trace Summary:</div>
                <div className="break-all">{this.state.error.name}: {this.state.error.message}</div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-mono text-xs">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(230,57,70,0.25)] hover:-translate-y-0.5 cursor-pointer"
              >
                <RefreshCw size={14} className="animate-spin-slow" />
                <span>RELOAD SESSION</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl font-bold transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <Home size={14} />
                <span>RETURN HOME</span>
              </button>
            </div>

          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
