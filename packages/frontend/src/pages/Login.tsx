import { FC } from 'preact/compat';
import { githubConfig } from '../config';
import { Table } from 'components/Table';

const { clientId, redirect_uri } = githubConfig;
const scopes = 'read:org,read:user';

const handleAuth = () => {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=${scopes}`;
};
export const Login: FC = () => {
  return (
    <div className="relative min-h-full bg-gray-50 pt-16 overflow-hidden sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
        <div>
          <h2 className="text-base font-semibold tracking-wider text-indigo-600 uppercase">
            Bestyjs
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Helicopter view of your javascript GitHub repos.
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
            Get a dashboard for analyze best practices of your javascript repos in one click.
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
        <Table />
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
  );
};
