
import { Request, Response, NextFunction } from 'express';

export function VerifyHeaderToken(req: Request, res: Response, next: NextFunction) {
    const tokenOrNull = analizeToken(req.headers['token']);
    if (!tokenOrNull)
        res.status(401).end();
    else {
        req.headers.token = tokenOrNull;
        next();
    }
}

export function analizeToken(maybe: any): string | null {
    if (typeof maybe !== 'string')
        return null;
    const payload: string[] = maybe.split(' ');

    return (!!payload[1] === false) ? null : payload[1];
}
