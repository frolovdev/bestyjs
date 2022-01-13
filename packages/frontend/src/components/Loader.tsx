import { FC } from 'preact/compat';

export const Loader: FC<{ fullScreen?: boolean }> = ({ fullScreen = false }) => (
  <div className={`flex items-center h-${fullScreen ? 'screen' : 'full'} justify-center`}>
    <svg
      className="animate-bounce w-40 h-40"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 1000 1000"
      xmlSpace="preserve"
    >
      <path
        style={{ fill: '#111827' }}
        d="M633.6,471.8h9.9h9.9v-45.6c0-8.3-4.4-16-11.7-20.2l-130.2-75.2c-7.1-4.1-15.9-4.2-23.1-0.1l-129.9,72.9
	c-7.4,4.1-11.9,11.9-11.9,20.3v150c0,8.3,4.4,16,11.7,20.2l130.2,75.2c7.1,4.1,15.9,4.2,23.1,0.1l129.9-72.9
	c7.4-4.1,11.9-11.9,11.9-20.3v-44.8h-19.1h-0.7H612v-59.6H633.6z M407.9,552v-19.8h184.3V552L500,605.2L407.9,552z M592.1,512.4
	H407.9v-21.6h184.3V512.4z M407.9,470.9v-25.3l17-9.8l47.5-27.4l0,0l27.7-16l92.1,53.2v25.3H407.9z M500,344.6l133.6,77.1v30.2H612
	v-17.8l-112-64.7l-85.2,49.2l-48.4,27.9v-24.8L500,344.6z M500,653l-133.6-77.1V469.4L388,457v13.9v61.3v31.2l66.9,38.6l64.6,39.7
	L500,653z M633.6,575.9l-94.5,54.6l-20.9-12.8l93.8-54.2v-12.2h21.6V575.9z"
      />
    </svg>
  </div>
);
