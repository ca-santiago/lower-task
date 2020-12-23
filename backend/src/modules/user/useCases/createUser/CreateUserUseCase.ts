
import { CreateUserDTO } from "./CreateUserDTO";
import { Result } from "../../../../shared/core/Result";
import { IUserRepository } from "../../repositories/IUserRepo";
import { IUseCase } from '../../../../shared/core/UseCase';
import { Email } from "../../domain/Email";
import { Password } from "../../domain/Password";
import { Username } from "../../domain/Username";
import { CreateUsernameError } from "./CreateUserErrors";
import { User } from "../../domain/User";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { UserMapper } from "../../mappers/user.mapper";
import { Guard } from "../../../../shared/core/Guard";

import moment from 'moment';

export class CreateUser implements IUseCase<CreateUserDTO, Result<void>>{

    constructor(
        private readonly userRepo: IUserRepository,
        private readonly mapper: UserMapper) { }

    async run(request: CreateUserDTO): Promise<Result<any>> {
        const { email, password, username } = request;

        const emailGuardResult = Guard.againstNullOrUndefined(email, 'email');
        const passwordGuardResult = Guard.againstNullOrUndefined(password, 'password');
        const usernameGuardResult = Guard.againstNullOrUndefined(username?.name, 'username -> name');
        const lastNameWithDefault = Guard.optionalInput(username?.last, '');

        Result.combine([
            emailGuardResult, passwordGuardResult,
            usernameGuardResult
        ]);
        if (!usernameGuardResult.isSuccess)
            return new UseCasesErrors.InvalidParamError(usernameGuardResult.error);

        try {
            const emailOrError: Result<Email> = Email.create({ value: request.email });
            const passwordOrError: Result<Password> = await Password.create({ value: request.password, isHashed: false });
            const usernameOrError: Result<Username> = Username.create({
                first: request.username.name,
                last: lastNameWithDefault
            });

            // Combining all results in order to get the errors an return invalid
            // param error if exits
            const dtoResult = Result.combine([
                emailOrError, passwordOrError, usernameOrError]);
            if (dtoResult.isSuccess == false)
                return new UseCasesErrors.InvalidParamError(dtoResult.error);

            const email = emailOrError.getValue();
            const password = passwordOrError.getValue();
            const username = usernameOrError.getValue();

            // User already exist verification
            const userExistResult = await this.userRepo.exists(email.value);
            if (userExistResult)
                return new CreateUsernameError.EmailAlreadyExists(email.value);

            const userOrError: Result<User> = User.create({
                email, password, username,
                isEmailVerified: false, picture: null,
                createdAt: moment().format(),
            });

            if (userOrError.isSuccess == false)
                return Result.fail(userOrError.error);

            const userPersistenDTO = this.mapper.toPersistence(userOrError.getValue());
            await this.userRepo.save(userPersistenDTO);

            return Result.ok<void>();
        } catch (err) {
            return Result.fail(err);
        }
    } // End of the run method
}
