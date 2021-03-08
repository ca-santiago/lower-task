import { Result } from "../../../../../shared/core/Result";
import { IUseCase } from "../../../../../shared/core/UseCase";
import { WorkspaceMapper } from "../../../mapper/workspace/mapper";
import { OwnerWorkspaceDTO } from "../../../mapper/workspace/public.dto";
import { IWorkspaceRepo } from "../../../repository/IWorkspaceRepo";
import { GetWorkspacesByOwnerDTO } from "./DTO";

export type _Result = Result<OwnerWorkspaceDTO[]>;

export class GetWorkspacesByOwnerUseCase
  implements IUseCase<GetWorkspacesByOwnerDTO, _Result> {
  constructor(
    private readonly worksRepo: IWorkspaceRepo,
    private readonly wsMapper: WorkspaceMapper
  ) {}

  async run(dto: GetWorkspacesByOwnerDTO): Promise<_Result> {
    const { accountId } = dto;

    const results = await this.worksRepo.findByOwner(accountId);
    const mapped = results.map((ws) => this.wsMapper.toOwnerDTO(ws));

    return Result.ok(mapped);
  }
}
