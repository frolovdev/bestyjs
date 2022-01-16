import { FC } from 'preact/compat';
import { githubConfig } from '../config';
import { Table } from 'components/Table';
import { Footer } from '../components/Footer';

const { clientId, redirect_uri } = githubConfig;
const scopes = 'read:org,read:user';

const generateNonce = (length: number = 32) => {
  const bytes = new Uint8Array(length);
  const result = [];
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';

  const { crypto } = window;

  if (!crypto) {
    throw new Error("we don't support browsers without crypto module, please use modern browsers");
  }

  const random = crypto.getRandomValues(bytes);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < random.length; i++) {
    result.push(charset[random[i] % charset.length]);
  }

  return result.join('');
};

export const Login: FC = () => {
  const handleAuth = () => {
    const state = generateNonce();

    sessionStorage.setItem('state', state);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=${scopes}&state=${state}`;
  };

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <div className="flex-grow relative  pt-16 overflow-hidden sm:pt-24 lg:pt-32">
        <div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
          <div>
            <h2 className="text-base font-semibold tracking-wider text-indigo-600 uppercase">
              Bestyjs
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Javascript repository best practices made easy.
            </p>
            <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
              Up to date best practices dashboard in just one click.
            </p>
          </div>
        </div>
        <div className="text-center mt-20 text-lg font-medium text-gray-900 tracking-tight">
          Connect your account via Github
        </div>
        <div className="h-14 bg-purple-600 w-1 mx-auto rounded"></div>
        <div className="text-center text-lg font-medium text-gray-900 tracking-tight">
          Get your dashboard
        </div>
        <div className="mt-4">
          <Table isPlaceholder />
        </div>
        <div className="mt-20">
          <button
            onClick={handleAuth}
            className="mx-auto flex items-center justify-center px-12 py-4 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 text-lg"
          >
            Get started
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
