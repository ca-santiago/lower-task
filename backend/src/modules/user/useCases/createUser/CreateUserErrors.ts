import { Result } from "../../../../shared/core/Result";


export namespace CreateUsernameError {

    export class EmailAlreadyExists extends Result<any>{

        constructor(email: string) {
            super(
                false,
                [`The email ${email} associated for this account already exists`],
                null
            )
        }
    }

} 