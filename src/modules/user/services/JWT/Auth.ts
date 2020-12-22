
import IAuthService from '../IAuthService';
import { JWTPayload, JWTToken } from '../../domain/jwt';
import { Result } from '../../../../shared/core/Result';

import jwt from 'jsonwebtoken';

export class JWTAuthService implements IAuthService {

    constructor(private readonly secret: string) {
    }

    async sign(props: JWTPayload): Promise<string> {
        let token: string = jwt.sign(props, this.secret);
        return token;
    }
    async decode(token: string): Promise<Result<JWTPayload>> {
        try {
            let decodedToken = jwt.verify(token, this.secret) as JWTPayload;
            return Result.ok<JWTPayload>(decodedToken);
        } catch (err) {
            return Result.fail(['Invalid token']);
        }
    }
}