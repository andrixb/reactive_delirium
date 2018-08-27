import * as express from 'express';

import { HomeRoute, TestRoute, NotFoundRoute } from './routes';

export class APIRouter {
    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
        this.createRoutes();
    }

    private createRoutes() {
        new HomeRoute('ALL', '/', this.app);
        new TestRoute('GET','/test',this.app);
        new NotFoundRoute('GET', '*', this.app);
    }
}
