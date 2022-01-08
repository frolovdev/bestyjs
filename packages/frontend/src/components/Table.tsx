import { reposQuery } from 'api';
import { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';

interface IRepoResponse {
  owner: string;
  name: string;
  fullName: string;
  language: string;
  contentUrl: string;
  eslint: boolean;
  prettier: boolean;
  jest: boolean;
}
const placeHolderRepos: IRepoResponse[] = [
  {
    name: 'anyspec',
    owner: 'random',
    fullName: 'random/anyspec',
    contentUrl: 'random',
    language: 'Typescript',
    eslint: true,
    prettier: false,
    jest: false,
  },
];

interface Props {
  isPlaceholder?: boolean;
}

export const Table: FC<Props> = ({ isPlaceholder = false }) => {
  const [repos, setRepos] = useState<IRepoResponse[]>();
  useEffect(() => {
    if (isPlaceholder) {
      setRepos(placeHolderRepos);
    } else {
      const fetch = async () => {
        try {
          const response = await reposQuery();
          const repos = await response.json();
          setRepos(repos);
        } catch (err) {
          console.error(err);
        }
      };
      void fetch();
    }
  }, []);

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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {repos &&
                    repos.map((repo) => (
                      <tr key={repo.fullName}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {repo.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {repo.eslint ? '✅' : '❌'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {repo.prettier ? '✅' : '❌'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {repo.jest ? '✅' : '❌'}
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
