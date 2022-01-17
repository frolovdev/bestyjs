export const githubConfig = {
  clientId: import.meta.env.VITE_APP_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_APP_CALLBACK_URL,
};

export const rollbarConfig = {
  accessToken: import.meta.env.VITE_APP_ROLLBAR_ACCESS_TOKEN as string,
  captureUncaught: true,
  captureUnhandledRejections: true,
};
