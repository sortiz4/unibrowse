import * as url from 'chimera/url';

export const DEBUG = process['env']['NODE_ENV'] !== 'production';
export const SERVER_URL = DEBUG ? 'http://localhost:5000' : '';
export const API_URL = url.join(SERVER_URL, 'api');
