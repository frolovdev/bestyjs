import { Route, Switch } from 'wouter-preact';
import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { meQuery } from './api';
import { useEffect, useState } from 'preact/compat';
import { CallbackPage } from './components/CallbackPage';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { Table } from 'components/Table';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<'init' | 'progress' | 'fulfilled' | 'error'>('init');
  const [status, setStatus] = useState<number>();
  useEffect(() => {
    const fetch = async () => {
      const { status } = await meQuery();
      setStatus(status);
    };
    fetch()
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading('fulfilled');
      });
  }, []);
  useEffect(() => {
    if (loading === 'fulfilled') {
      setIsAuthenticated(status === 200);
    }
  }, [loading, status]);

  return (
    <>
      <Toaster position="top-right">
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <div className="flex item-center cursor-pointer" onClick={() => toast.dismiss(t.id)}>
                {icon}
                {message}
              </div>
            )}
          </ToastBar>
        )}
      </Toaster>
      <Switch>
        <PrivateRoute
          redirectTo="/repo-list"
          loading={loading}
          isAuthenticated={isAuthenticated}
          path="/"
          component={Login}
        />
        <Route path="/callback" component={CallbackPage}>
          Callback
        </Route>
        <PrivateRoute
          loading={loading}
          isAuthenticated={isAuthenticated}
          path="/repo-list"
          redirectTo="/"
          component={Table}
        />
        <Route>404, Not Found!</Route>
      </Switch>
    </>
  );
};

export default App;
