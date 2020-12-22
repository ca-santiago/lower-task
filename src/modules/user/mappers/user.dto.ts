
export interface UserDTO {
    name: {
        first: string;
        last: string;
    };
    email: string;
    isEmailVerified: boolean;
    createdAt: string;
    id: string;
    profilePicture?: {
        format: string;
        thumbnail: string;
        small: string;
        large: string;
    },
}
