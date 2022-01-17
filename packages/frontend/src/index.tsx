import 'index.css';
import { render } from 'preact';
import App from 'App';
import ErrorBoundary, { rollbar } from 'components/ErrorBoundary';

render(
  <ErrorBoundary rollbar={rollbar}>
    <App />
  </ErrorBoundary>,
  document.getElementById('root') as Element,
);
