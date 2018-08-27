import * as express from 'express';

export interface IRoutes {
    type: string; 
    url: string; 
    app: express.Application;
}
