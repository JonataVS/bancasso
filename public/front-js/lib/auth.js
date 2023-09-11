function isAuthenticated() {
  if(!getToken()) {
    window.location.href = '/login.html';
  } else {
    return true;
  }
}

function getToken() {
  return localStorage.getItem('@sst:token');
}

function login(token) {
  localStorage.setItem('@sst:token', token);

  window.location.href = '/init.html';
}

function logout() {
  localStorage.removeItem('@sst:token');

  window.location.href = '/form.html';
}

export default { isAuthenticated, getToken, login, logout };