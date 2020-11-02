
import express, { Request, Response, response } from 'express';


export abstract class BaseController {

    protected abstract executeImpl(req: express.Request, res: express.Response): Promise<any>;

    public async execute(req: Request, res: Response): Promise<any> {
        try {
            await this.executeImpl(req, res);
        } catch (err) {
            console.log(`Loggin the error ${err}`);
            this.fail(res, undefined, 'Internal server error');
        }
    }

    public static jsonResponse(res: express.Response, code: number, errors?: string[], extraParams?: object) {
        res.status(code).json({ errors, ...extraParams })
    }

    public ok(res: express.Response, dto?: object) {
        res.type('application/json')
        BaseController.jsonResponse(res, 200, undefined, dto ? dto : {});
    }

    public created(res: express.Response, dto?: object) {
        BaseController.jsonResponse(res, 201, undefined, dto ? dto : {});
    }

    public badRequest(res: express.Response, err: string[]) {
        BaseController.jsonResponse(res, 400, err, {});
    }

    /**
     * Confict: http 409
     */
    public conflict(res: express.Response, message?: string[]) {
        BaseController.jsonResponse(res, 409, message, {});
    }

    /**
     * 
     * @param message A description of the error
     */
    public unauthorized(res: express.Response, message?: string) {
        BaseController.jsonResponse(res, 401, undefined, { message });
    }

    /**
     * Server Error: http 500 
     */
    public fail(res: express.Response, errors?: string[], errorCode?: string) {
        return res.status(500).json({
            errors,
            error: errorCode
        });
    }

    /**
     *  Http: 404
     */
    public notFound(res: express.Response) {
        return BaseController.jsonResponse(res, 404);
    }
}