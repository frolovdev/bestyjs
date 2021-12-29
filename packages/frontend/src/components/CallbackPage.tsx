import { FC, useEffect } from 'preact/compat';
import { fetchAccessToken } from '../api';
import { toast } from 'react-hot-toast';
import { useLocation } from 'wouter-preact';

export const CallbackPage: FC = () => {
  const [_, setLocation] = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code') || '';
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
        console.error(err);
        setLocation('/');
      }
    };
    fetch()
      .then(() => {
        setLocation('/repo-list');
      })
      .catch(() => {});
  }, []);
  return <div>Redirecting to /repo-lists...</div>;
};
