
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
        baseName: string;
        format: string;
        large: string;
        small: string;
        thumbnail: string;
    } | null;
}
