import { FC } from 'preact/compat';
import { githubConfig } from '../config';
import { useLocation } from 'wouter-preact';
import { Table } from 'components/Table';
import { Footer } from '../components/Footer';
import { IRepoResponse } from 'types/repo';
import { useState } from 'preact/compat';
import { ChangeEvent, EventHandler, SyntheticEvent } from 'react';

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

const placeHolderRepos: IRepoResponse[] = [
  {
    name: 'Your repo name',
    owner: 'random',
    fullName: 'random/anyspec',
    contentUrl: 'random',
    language: 'Typescript',
    typescript: {
      isTypescript: true,
      version: {
        latestVersion: 'latest',
        installedVersion: 'latest',
      },
    },
    eslint: true,
    prettier: false,
    jest: false,
    cspell: true,
    editorConfig: true,
  },
  {
    name: 'Your another repo',
    owner: 'random',
    fullName: 'random/anyspec',
    contentUrl: 'random',
    language: 'Typescript',
    typescript: {
      isTypescript: false,
      version: {
        error: 'unavailable',
        installedVersion: '4.5.1',
        latestVersion: '',
      },
    },
    eslint: true,
    prettier: true,
    jest: true,
    cspell: false,
    editorConfig: true,
  },
];

export const Login: FC = () => {
  const [_, setLocation] = useLocation();
  const handleOauth = () => {
    const state = generateNonce();

    sessionStorage.setItem('state', state);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=${scopes}&state=${state}`;
  };

  const [username, setUsername] = useState<string>();

  function handleGoToPublicRepoList() {
    setLocation(`/public-repo-list?username=${username}`);
  }

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

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
          <Table repos={placeHolderRepos} />
        </div>

        <div className="mt-10 text-center text-lg font-medium text-gray-900 tracking-tight">
          Fill in your Github Username
        </div>

        <div className="mt-5 flex">
          <input
            onChange={handleUsernameChange}
            value={username}
            type="text"
            className="pl-2 py-3 mx-auto shadow-md focus:ring-indigo-500 focus:border-indigo-500 block pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="your github username"
          />
        </div>

        <div className="mt-2">
          <button
            onClick={handleGoToPublicRepoList}
            className="mx-auto flex items-center justify-center px-14 py-2 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 text-lg"
          >
            Get started
          </button>
        </div>

        <div className="mt-12 text-center text-lg font-medium text-gray-900 tracking-tight">
          Or use Oauth with Github
        </div>

        <div className="mt-2">
          <button
            onClick={handleOauth}
            className="mx-auto flex items-center justify-center px-8 py-2 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 text-lg"
          >
            Auth with Github
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
