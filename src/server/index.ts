import 'promise/polyfill';
import 'whatwg-fetch';
import { RDServer } from './rd-server';

let app = new RDServer().getApp();
export { app };
