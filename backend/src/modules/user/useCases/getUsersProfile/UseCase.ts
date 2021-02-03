
import { Result } from "../../../../shared/core/Result";
import { IUseCase } from "../../../../shared/core/UseCase";
import {IOBjectStorageService} from "../../../../shared/services/IObjectStorage";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { UserMapper } from "../../mappers/user.mapper";
import { IUserRepository } from "../../repositories/IUserRepo";
import IAuthService from "../../services/IAuthService";
import { GetUsersProfileDTO } from "./DTO";

export class GetUsersProfileUseCase implements IUseCase<GetUsersProfileDTO, Result<any>>{

  constructor(
    private readonly userRepo: IUserRepository,
    private readonly userMapper: UserMapper,
		private readonly StorageService: IOBjectStorageService,
  ) { }

  async run(request: GetUsersProfileDTO): Promise<Result<any>> {

    const userArr = await this.userRepo.getMany();
		
    const mappedUserArr = await Promise.all(userArr.map(async theUser => {
				const url = this.StorageService.GetSignedObjectURL(theUser.picture.keyName);
		    return this.userMapper.toDTO(theUser,{pictureURL: url})
		}));

    return Result.ok({ resultsCount: mappedUserArr.length, results: mappedUserArr });
  }

}
