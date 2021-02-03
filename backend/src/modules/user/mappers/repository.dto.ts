
export interface UserPersistenceDTO {
    name: {
        first: string,
        last: string,
    }
    email: string,
    password: string;
    isEmailVerified: boolean;
    createdAt: string;
    id: string;
    picture: {
        format: string;
        keyName: string;
    } | null;
}
