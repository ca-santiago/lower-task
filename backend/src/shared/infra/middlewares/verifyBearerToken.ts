
import { Request, Response, NextFunction } from 'express';
import { authService } from '../../../modules/user/services';


export async function VerifyHeaderToken(req: Request, res: Response, next: NextFunction) {
    const tokenOrNull = analizeToken(req.headers['authorization'] || req.headers['Authorization'] || req.headers['token']);
    if (!tokenOrNull)
        res.status(401).end();
    else {
        const payloadOrErorr = await authService.decode(tokenOrNull);
        if (payloadOrErorr.isSuccess === false)
            return res.status(401).send();

        req.params.userId = payloadOrErorr.getValue().userId;
        next();
    }
}

export function analizeToken(maybe: any): string | null {
    if (typeof maybe !== 'string')
        return null;
    const payload: string[] = maybe.split(' ');

    return (!!payload[1] === false) ? null : payload[1];
}
