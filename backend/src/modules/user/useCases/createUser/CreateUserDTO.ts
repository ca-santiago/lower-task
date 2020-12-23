

interface username{
    name: string;
    last: string;
}

export interface CreateUserDTO{
    username: username;
    password: string;
    email: string;
}