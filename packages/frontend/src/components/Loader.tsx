import { FC } from 'preact/compat';

export const Loader: FC<{ fullScreen?: boolean }> = ({ fullScreen = false }) => (
  <div className={`flex items-center h-${fullScreen ? 'screen' : 'full'} justify-center`}>
    <div
      className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
      role="status"
    ></div>
  </div>
);
