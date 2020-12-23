
import { JWTPayload, JWTToken } from '../domain/jwt.d';
import { Result } from '../../../shared/core/Result';

export default interface IAuthService {
    sign(props: JWTPayload): Promise<JWTToken>;
    /**
     * Given a token as string, return the payload or null if is an invalid token
     * @param token 
     */
    decode(token: JWTToken): Promise<Result<JWTPayload>>;
}
