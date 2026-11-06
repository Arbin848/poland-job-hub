import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in CV Editor:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('polcv_studio_cv_data_v1');
    } catch {
      // Ignore storage errors
    }
    window.location.reload();
  };

  private handleTryAgain = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800">
          <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Wystąpił nieoczekiwany błąd / An unexpected error occurred
            </h2>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Dane w Twojej przeglądarce mogą wymagać odświeżenia. Możesz spróbować ponownie lub zresetować stan edytora.
            </p>
            {this.state.error && (
              <pre className="text-[11px] font-mono bg-slate-100 p-2.5 rounded-lg text-slate-600 text-left mb-4 overflow-x-auto max-h-24">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                onClick={this.handleTryAgain}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition"
              >
                Spróbuj ponownie / Try again
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resetuj stan / Reset</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
