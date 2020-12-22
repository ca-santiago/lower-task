import { IUseCase } from "../../../../shared/core/UseCase";
import { DeleteUserDTO } from "./DeleteUserDTO";
import { IUserRepository } from "../../repositories/IUserRepo";
import { Result } from "../../../../shared/core/Result";
import { EntityId } from "../../../../shared/domain/EntityId";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { Guard } from "../../../../shared/core/Guard";
import IAuthService from "../../services/IAuthService";
import { JWTPayload } from "../../domain/jwt";



export class DeleteUser implements IUseCase<DeleteUserDTO, Result<any>>{

    constructor(
        private readonly repo: IUserRepository,
        private readonly auth: IAuthService
    ) {
    }

    async run(request: DeleteUserDTO): Promise<Result<null>> {
        const payloadOrError = await this.auth.decode(request.token);
        if (payloadOrError.isSuccess === false)
            return new UseCasesErrors.InvalidCredentials();

        const payload: JWTPayload = payloadOrError.getValue();

        const idOrError = EntityId.from(payload.userId);
        if (idOrError.isSuccess === false)
            return new UseCasesErrors.Unauthorized();

        this.repo.delete(idOrError.getValue().value);

        return Result.ok();
    }

}