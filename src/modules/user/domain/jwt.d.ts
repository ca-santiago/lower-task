
interface JWTPayload {
    userId: string;
    username: {
        first: string,
        last: string
    };
    isEmailVerified: boolean;
    email: string;
}

type JWTToken = string;


export {
    JWTPayload,
    JWTToken
}