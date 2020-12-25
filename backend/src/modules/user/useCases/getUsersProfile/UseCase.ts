
import { Result } from "../../../../shared/core/Result";
import { IUseCase } from "../../../../shared/core/UseCase";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { UserMapper } from "../../mappers/user.mapper";
import { IUserRepository } from "../../repositories/IUserRepo";
import IAuthService from "../../services/IAuthService";
import { GetUsersProfileDTO } from "./DTO";

export class GetUsersProfileUseCase implements IUseCase<GetUsersProfileDTO, Result<any>>{

  constructor(
    private readonly userRepo: IUserRepository,
    private readonly userMapper: UserMapper
  ) { }

  async run(request: GetUsersProfileDTO): Promise<Result<any>> {

    const userArr = await this.userRepo.getMany();
    const mappedUserArr = userArr.map(theUser => this.userMapper.toDTO(theUser));

    return Result.ok({ resultsCount: mappedUserArr.length, results: mappedUserArr });
  }

}
