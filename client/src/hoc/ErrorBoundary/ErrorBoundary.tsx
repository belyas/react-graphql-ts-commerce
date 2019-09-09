import React, { Component, ErrorInfo } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log('Catched error: ', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Ooops! something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
