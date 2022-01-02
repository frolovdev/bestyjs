import { FC, useEffect } from 'preact/compat';
import { fetchAccessToken } from '../api';
import { toast } from 'react-hot-toast';
import { useLocation } from 'wouter-preact';

export const CallbackPage: FC = () => {
  const [_, setLocation] = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code') || '';
    const stateQueryParams = queryParams.get('state');
    const stateStorage = sessionStorage.getItem('state');
    sessionStorage.removeItem('state');
    if (!stateQueryParams || !stateStorage || stateStorage !== stateQueryParams) {
      toast.error('No state');
      return;
    }

    const fetch = async () => {
      try {
        const { status } = await fetchAccessToken(code);
        if (status === 200) {
          toast.success('Logged in successfully.');
          setLocation('/repo-list');
        } else {
          toast.error('Something went wrong');
        }
      } catch (err) {
        toast.error('Something went wrong');
        setLocation('/');
      }
    };
    fetch();
  }, []);
  return <div>Redirecting back...</div>;
};
