import { CallbackPage } from './components/CallbackPage';
import { PrivateRoute } from './components/PrivateRoute';
import { RepoList } from './components/RepoList';
import { Route, Switch } from 'wouter-preact';
import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { meQuery } from './api';
import { useEffect, useState } from 'preact/compat';
import LanguageButtons from 'components/LanguageButtons';
import LocalizationProvider from 'localization/LocalizationProvider';
import Login from './components/Login';
import MainBlock from 'components/MainBlock';
import Root from 'components/Root';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [status, setStatus] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { status } = await meQuery();
        setStatus(status);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    void fetch();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      setIsAuthenticated(status === 200);
    }
  }, [isLoading, status]);

  if (isLoading) {
    return null;
  }

  return (
    <Root>
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
      <LocalizationProvider>
        <MainBlock />
        <LanguageButtons />
      </LocalizationProvider>
      <Switch>
        <PrivateRoute
          redirectTo="/repo-list"
          allowVisit={!isAuthenticated}
          path="/"
          component={Login}
        />
        <Route path="/callback" component={CallbackPage}>
          Callback
        </Route>
        <PrivateRoute
          path="repo-list"
          allowVisit={isAuthenticated}
          redirectTo="/"
          component={RepoList}
        />
      </Switch>
    </Root>
  );
};

export default App;
