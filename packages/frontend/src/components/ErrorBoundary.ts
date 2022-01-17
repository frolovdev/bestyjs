import { rollbarConfig } from 'config';
import { Component, ReactNode } from 'react';
import Rollbar from 'rollbar';

interface Props {
  children: ReactNode;
  rollbar: Rollbar;
}

const rollbarStub = {
  global() {
    return this;
  },
  error: () => {
    return { uuid: 'random' };
  },
  log: () => {
    return { uuid: 'random' };
  },

  debug: () => {
    return { uuid: 'random' };
  },
  info: () => {
    return { uuid: 'random' };
  },
  warn: () => {
    return { uuid: 'random' };
  },
  warning: () => {
    return { uuid: 'random' };
  },
  critical: () => {
    return { uuid: 'random' };
  },
} as unknown as Rollbar;

export const rollbar =
  import.meta.env.MODE === 'production'
    ? new Rollbar({
        ...rollbarConfig,
        environment: import.meta.env.MODE as string,
      })
    : rollbarStub;

// eslint-disable-next-line react/prefer-stateless-function
export default class ErrorBoundary extends Component<Props> {
  private rollbar: Rollbar;

  constructor(props: Props) {
    super(props);
    this.rollbar = props.rollbar;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.rollbar.error(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}
