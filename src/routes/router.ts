import * as express from 'express';

import { Routes } from '../models';
import { HomeRoute } from './home.route';

export class Router {
    private _app: express.Application;
    private homeRoute: HomeRoute;

    constructor(app: express.Application) {
        this._app = app;
        this.createRouter();
    }

    private createRouter() {
        this.homeRoute = new HomeRoute('/', this._app);
    }
}
