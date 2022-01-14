import { reposQuery } from 'api';
import { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import toast from 'react-hot-toast';
import { LoadingState } from 'types';
import { Loader } from './Loader';

interface IRepoResponse {
  owner: string;
  name: string;
  fullName: string;
  language: string;
  contentUrl: string;
  typescript: boolean;
  eslint: boolean;
  prettier: boolean;
  jest: boolean;
  cspell: boolean;
  editorConfig: boolean;
}
const placeHolderRepos: IRepoResponse[] = [
  {
    name: 'Your repo name',
    owner: 'random',
    fullName: 'random/anyspec',
    contentUrl: 'random',
    language: 'Typescript',
    typescript: true,
    eslint: true,
    prettier: false,
    jest: false,
    cspell: true,
    editorConfig: true,
  },
];

interface Props {
  isPlaceholder?: boolean;
}

export const Table: FC<Props> = ({ isPlaceholder = false }) => {
  const [loading, setLoading] = useState<LoadingState>(isPlaceholder ? 'fulfilled' : 'init');
  const [repos, setRepos] = useState<IRepoResponse[]>(isPlaceholder ? placeHolderRepos : []);
  useEffect(() => {
    if (isPlaceholder) {
      return;
    }

    const fetch = async () => {
      setLoading('progress');
      try {
        const response = await reposQuery();
        const repos = await response.json();
        setRepos(repos);
        setLoading('fulfilled');
      } catch (err) {
        setLoading('error');
        toast.error('Something bad happened :(');
      }
    };
    void fetch();
  }, []);

  if (loading !== 'fulfilled') {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Repo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Typescript
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Eslint
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Prettier
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Jest
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cspell
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      EditorConfig
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {repos &&
                    repos.map((repo) => (
                      <tr key={repo.fullName} className="divide-x divide-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {repo.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {repo.typescript ? '✅' : '❌'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {repo.eslint ? '✅' : '❌'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {repo.prettier ? '✅' : '❌'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {repo.jest ? '✅' : '❌'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {repo.cspell ? '✅' : '❌'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {repo.cspell ? '✅' : '❌'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
