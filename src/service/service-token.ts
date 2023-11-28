export interface TokenInfo {
  exp: number;
  iat: number;
  userId: number;
}

function setToken(token: string) {
  localStorage.setItem('token', token);
}

function getToken(): { token: string } | null {
  try {
    return {
      token: localStorage.getItem('token') ?? '',
    };
  } catch (e) {
    return null;
  }
}

function getTokenDetails(): TokenInfo | null {
  try {
    const token = getToken();
    return token
      ? (JSON.parse(window.atob(token.token.split('.')[1])) as TokenInfo)
      : null;
  } catch (e) {
    return null;
  }
}

function isAuthenticated() {
  const tokenDetails = getTokenDetails();
  if (tokenDetails) {
    return true;
  } else {
    return false;
  }
}

function clearToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
}

export const getRole = () => {
  return getTokenDetails();
};

const TokenService = {
  setToken,
  getToken,
  getTokenDetails,
  isAuthenticated,
  clearToken,
};

export default TokenService;
