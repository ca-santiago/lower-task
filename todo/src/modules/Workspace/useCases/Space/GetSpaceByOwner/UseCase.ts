import { Result } from "../../../../../shared/core/Result";
import { IUseCase } from "../../../../../shared/core/UseCase";
import { SpaceOwnerDTO } from "../../../mapper/space/DTOs";
import { SpaceMapper } from "../../../mapper/space/mapper";
import { ISpaceRepo } from "../../../repository/ISpaceRepo";
import { GetSpaceByOwnerDTO } from "./DTO";

export type _Result = Result<SpaceOwnerDTO>;

export class GetSpaceByOwnerUseCase
  implements IUseCase<GetSpaceByOwnerDTO, _Result> {
  constructor(
    private readonly spaceRepo: ISpaceRepo,
    private readonly sMapper: SpaceMapper
  ) {}

  async run(dto: GetSpaceByOwnerDTO): Promise<_Result> {
    const { accountId, ownerId } = dto;

    const spaceOrNull = await this.spaceRepo.findByOwnerId(ownerId);

    if (!spaceOrNull) return Result.fail(["Not found"]);
    
	  /**
		 * TODO:
		 * Verify ownerId and accountId 
		 * if are equal return dto by owner. Otherwise return
		 * a public DTO
		 * */	
    const payload = this.sMapper.toOwnerDTO(spaceOrNull);

    return Result.ok(payload);
  }
}
