export const signUp = (data) => ({
  type: "SIGN_UP",
  data,
});

export const signIn = (data) => ({
  type: "SIGN_IN",
  data,
});

export const signOut = (data) => ({
  type: "SIGN_OUT",
});

export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

export const requestData = () => ({
  type: "REQUEST_DATA",
});

export const receiveData = (data) => ({
  type: "RECEIVE_DATA",
  data,
});

export const receiveDataError = () => ({
  type: "RECEIVE_DATA_ERROR",
});
