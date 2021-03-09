import { Result } from "../../../../../shared/core/Result";
import { IUseCase } from "../../../../../shared/core/UseCase";
import { ISpaceRepo } from "../../../repository/ISpaceRepo";
import { CreateWorkspaceDTO } from "./DTO";

// TODO replace with either
export type _Result = Result<void>;

export class CreateWorkspaceUseCase
  implements IUseCase<CreateWorkspaceDTO, _Result> {
  constructor(private readonly spaceRepo: ISpaceRepo) {}

  public async run(dto: CreateWorkspaceDTO): Promise<_Result> {
    const { accountId, name } = dto;

    const spaceOrNull = await this.spaceRepo.findByOwnerId(accountId);
    if (!spaceOrNull) return Result.fail(["Not found"]);

    const ws = spaceOrNull.createWorkspace(name, spaceOrNull.id);
    if (ws.isSuccess == false)
      return Result.fail(["Limite de Workspaces alcanzado"]);

    await this.spaceRepo.save(spaceOrNull);
    return Result.ok(null);
  }
}
