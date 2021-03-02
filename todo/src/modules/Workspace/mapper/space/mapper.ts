import { Space } from "../../domain/Space";
import { EntityId } from "../../../../shared/domain/EntityId";
import { SpaceProps } from "../../domain/types";
import { SpaceRepoDTO } from "./repo.dto";

export class SpaceMapper {
  public constructor() {}

  public toRepository(s: Space): SpaceRepoDTO {
    const output: SpaceRepoDTO = {
      _id: s.id.value,
      name: s._name,
      owner: s.owner.value,
    };
    return output;
  }

  public toDomain(raw: SpaceRepoDTO): Space {
    const props: SpaceProps = {
      owner: EntityId.from(raw.owner).getValue(),
      _name: raw.name,
    };
    const a = Space.create(props).getValue();
    return a;
  }
}

