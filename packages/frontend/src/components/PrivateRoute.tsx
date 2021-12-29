import { ComponentType } from 'react';
import { FC } from 'preact/compat';
import { Redirect, Route, RouteProps } from 'wouter-preact';

interface CommonProps extends RouteProps {
  loading: 'init' | 'progress' | 'fulfilled' | 'error';
  isAuthenticated: boolean;
  redirectTo: string;
}
type Props = CommonProps & { component: ComponentType };

const PrivateRoute: FC<Props> = ({
  loading,
  isAuthenticated,
  redirectTo,
  component: Component,
  ...rest
}) => {
  if (loading !== 'fulfilled') {
    return null;
  }

  if (loading === 'fulfilled' && !isAuthenticated) {
    <Redirect to={redirectTo} />;
  }

  return <Route path={rest.path} component={Component} />;
};

export default PrivateRoute;
