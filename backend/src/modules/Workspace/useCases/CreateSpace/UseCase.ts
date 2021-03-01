import { Result } from "../../../../shared/core/Result";
import { IUseCase } from "../../../../shared/core/UseCase";
import { EntityId } from "../../../../shared/domain/EntityId";
import { Space } from "../../domain/Space";
import { SpaceProps } from "../../domain/types";
import { CreateSpaceDTO } from "./DTO";

export type _Result = Result<null>;

export class CreateSpaceUseCase implements IUseCase<CreateSpaceDTO, _Result> {
  public async run(dto: CreateSpaceDTO): Promise<_Result> {
    try {
      const { name, accountId } = dto;

      const owner = EntityId.from(accountId).getValue();
      const finalProps: SpaceProps = {
        _name: name,
        owner,
      };
      const newSpace = Space.create(finalProps).getValue();

      return Result.ok(null);
    } catch (err) {
			console.error(err);
		}
  }
}
