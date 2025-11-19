const AUTH_TOKEN_KEY = "authToken";
const AUTH_USER_KEY = "authUser";
const TOKEN_EXPIRY_KEY = "tokenExpiry";

export const saveAuthData = (user, token) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 2);

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryDate.toISOString());
};

export const getAuthData = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const userStr = localStorage.getItem(AUTH_USER_KEY);
  const expiryStr = localStorage.getItem(TOKEN_EXPIRY_KEY);

  if(!token || !userStr || !expiryStr) {
    return null;
  }

  const expiryDate = new Date(expiryStr);
  if (new Date() > expiryDate) {
    removeAuthData();
    return null;
  }

  try {
    const user = JSON.parse(userStr);
    return { user, token };
  } catch{
    removeAuthData();
    return null;
  }
};

export const removeAuthData = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

export const isTokenValid = () => {
    const authData = getAuthData();
    return authData !== null;
};