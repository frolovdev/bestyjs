import { ComponentType } from 'react';
import { FC } from 'preact/compat';
import { Redirect, Route, RouteProps } from 'wouter-preact';

interface CommonProps extends RouteProps {
  allowVisit: boolean;
  redirectTo: string;
}
type Props = CommonProps & { component: ComponentType | FC };

export const PrivateRoute: FC<Props> = ({
  allowVisit,
  redirectTo,
  component: Component,
  ...rest
}) => {
  const RedirectComponent = () => <Redirect to={redirectTo} />;
  return <Route component={allowVisit ? Component : RedirectComponent} />;
};
