import API from './lib/auth.js';

window.logout = API.logout;

if (API.isAuthenticated());