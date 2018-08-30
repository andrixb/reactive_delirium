import { IGetResponse } from './iget-response.interface';

export class GetResponse implements IGetResponse {
    private finalData: any;

    constructor(public response: any) {
        this.finalData = this.adaptResponse(this.response);
    }   

    private adaptResponse(response: any): any {
        return {
            status: 200,
            message: response.status,
            payload: {
                results: response.results,
                pagination: {
                    pageSize: response.pageSize,
                    currentPage: response.currentPage,
                    pages: response.pages,
                    total: response.total,
                    orderBy: response.orderBy
                }
            }
        }
    }

    public getData(): any {
        return this.finalData;
    }
}
