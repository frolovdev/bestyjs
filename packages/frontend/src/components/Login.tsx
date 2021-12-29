import { FC } from 'preact/compat';
import { githubConfig } from '../config';
import Button from './Button';

const { clientId, redirect_uri } = githubConfig;
const scopes = 'read:org,read:user';

const handleAuth = () => {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=${scopes}`;
};
export const Login: FC = () => {
  return <Button onClick={handleAuth} title="Login" />;
};
