import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

// Native ad views can throw during mount in environments where the AdMob
// native module isn't linked (e.g. an outdated dev client). Catching this
// keeps a failed ad slot from taking down the whole screen.
export class AdErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
