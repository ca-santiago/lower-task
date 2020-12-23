

import { Result } from "../../../../shared/core/Result";
import { IUseCase } from "../../../../shared/core/UseCase";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { UserDTO } from "../../mappers/user.dto";
import { UserMapper } from "../../mappers/user.mapper";
import { IUserRepository } from "../../repositories/IUserRepo";
import IAuthService from "../../services/IAuthService";

import { GetUserInfoDTO } from './DTO'


export class GetUserInfoUseCase implements IUseCase<GetUserInfoDTO, Result<any>>{

    constructor(
        private readonly repo: IUserRepository,
        private readonly mapper: UserMapper,
        private readonly authService: IAuthService,
    ) { }

    async run(request: GetUserInfoDTO): Promise<Result<UserDTO>> {
        const { token, userId, asPublic } = request;
        try {

            const payloadOrError = await this.authService.decode(token);
            if (payloadOrError.isSuccess === false)
                return new UseCasesErrors.Unauthorized();

            const user = await this.repo.getUserByUserId(
                userId ? userId : payloadOrError.getValue().userId);

            if (!user)
                return new UseCasesErrors.NotFound();

            const userMappedtoDTO = this.mapper.toDTO(user)

            return Result.ok(userMappedtoDTO);
        } catch (err) {
            console.log(`[Log GetInfo]: ${err}`);
            return Result.fail(err);
        }

    }

}
