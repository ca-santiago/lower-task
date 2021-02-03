
import { IUseCase } from "../../../../shared/core/UseCase";
import { IUserRepository } from "../../repositories/IUserRepo";
import { LoginDTO } from "./LoginDTO";
import { Result } from "../../../../shared/core/Result";
import { Email } from "../../domain/Email";
import { Password } from "../../domain/Password";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { User } from "../../domain/User";
import { UserMapper } from "../../mappers/user.mapper";
import { JWTPayload } from "../../domain/jwt";
import IAuthService from "../../services/IAuthService";
import { Guard } from "../../../../shared/core/Guard";
import {IOBjectStorageService} from "../../../../shared/services/IObjectStorage";



export class LoginUseCase implements IUseCase<LoginDTO, Result<any>>{

    constructor(
        private readonly repo: IUserRepository,
        private readonly mapper: UserMapper,
        private readonly authService: IAuthService,
				private readonly StorageService: IOBjectStorageService
    ) { }


    async run(request: LoginDTO): Promise<Result<any>> {
        const { email, password } = request;

        const emailGuardResult = Guard.againstNullOrUndefined(email, 'email');
        const passGuardResult = Guard.againstNullOrUndefined(password, 'password');
        const combienGuardResult = Result.combine([
            emailGuardResult, passGuardResult
        ]);
        if (combienGuardResult.isSuccess == false)
            return new UseCasesErrors.InvalidParamError(combienGuardResult.error);

        try {

            const emailOrError: Result<Email> = Email.create({ value: email });
            const passwordOrError: Result<string> = Password.scan(password);

            const combineResult = Result.combine([emailOrError, passwordOrError]);
            if (combineResult.isSuccess === false)
                return new UseCasesErrors.InvalidParamError(combineResult.error);


            const userOrError: User | null = await this.repo.getUserByEmail(emailOrError.getValue().value);

            if (!userOrError)
                return new UseCasesErrors.NotFound();

            const user: User = userOrError;

            if (!user.password.compare(password)) {
                return new UseCasesErrors.InvalidCredentials();
            }

						const signedURL = this.StorageService.GetSignedObjectURL(user.picture.keyName);

            const toDTO = this.mapper.toDTO(user, {pictureURL: signedURL});
            const payload: JWTPayload = this.mapper.toTokenPayload(
                toDTO
            );

            const token = await this.authService.sign(payload);

            return Result.ok({ token, ...toDTO });
        } catch (err) {
            return Result.fail(err);
        }

    }

}
