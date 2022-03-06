import { Table } from 'components/Table';
import { FC } from 'preact/compat';
import { reposQuery } from 'api';
import { useEffect, useState } from 'preact/hooks';
import toast from 'react-hot-toast';
import { LoadingState } from 'types';
import { Loader } from '../components/Loader';
import { IRepoResponse } from 'types/repo';

export const RepositoryList: FC = () => {
  const [loading, setLoading] = useState<LoadingState>('init');
  const [repos, setRepos] = useState<IRepoResponse[]>([]);
  useEffect(() => {
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
    return (
      <div className=" w-full h-full flex justify-center items-center">
        <Loader fullScreen />
      </div>
    );
  }

  return (
    <div className=" w-full h-full flex justify-center items-center">
      <Table repos={repos} />
    </div>
  );
};
