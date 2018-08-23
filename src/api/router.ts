import * as express from 'express';

import { HomeRoute } from './routes/home.route';

export class Router {
    private app: express.Application;
    private homeRoute: HomeRoute;

    constructor(app: express.Application) {
        this.app = app;
        this.createRoutes();
    }

    private createRoutes() {
        new HomeRoute('ALL', '/', this.app);
    }
}
