const config = require('../../package.json').projectConfig;
const BACKEND_BASE_URL = config.backendApiBaseUrl;

const COUNTRY_FLAG = {
  BASE_URL: `https://countryflagicons.com`,
  SIZE: {16: '16', 24: '24', 32: '32', 48: '48', 64: '64'},
  STYLE: {FLAT: 'FLAT', SHINY: 'SHINY'},
};

const STATIC_IMAGE = {
  BASE_URL: `${BACKEND_BASE_URL}/images`,
  TYPE: {POSTER: 'poster', LOGO: 'logo', GALLERY: 'gallery'},
  SIZE: {SQUARE: 'square', LANDSCAPE: 'landscape', PORTRAIT: 'portrait'},
  QUALITY: {SD: 'sd', HD: 'hd'},
};

const BACKEND_API = {
  BASE_API_URL: `${BACKEND_BASE_URL}/api`,
  REGISTER: '/register',
  LOGIN: '/login',
  USER_EXIST: '/user-exist',
  USER: '/user',
  REFRESH: '/refresh-token',
  RESTAURANT: '/restaurant',
};


export default {COUNTRY_FLAG, BACKEND_API, STATIC_IMAGE};