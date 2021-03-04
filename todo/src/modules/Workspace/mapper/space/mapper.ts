import { Space } from "../../domain/Space";
import { EntityId } from "../../../../shared/domain/EntityId";
import { SpaceProps } from "../../domain/types";
import { SpaceRepoDTO } from "./repo.dto";
import { SpaceOwnerDTO } from "./DTOs";

export class SpaceMapper {
  public constructor() {}

  public toRepository(s: Space): SpaceRepoDTO {
    const output: SpaceRepoDTO = {
      _id: s.id.value,
      name: s._name,
      owner: s.owner.value,
      maxWorkspaces: s.maxWorkspaces,
      totalWorkspaces: s.totalWorkspaces,
    };
    return output;
  }

  public toDomain(raw: SpaceRepoDTO): Space {
    const id = EntityId.from(raw._id).getValue();
    const props: SpaceProps = {
      owner: EntityId.from(raw.owner).getValue(),
      _name: raw.name,
      maxWorkspaces: raw.maxWorkspaces,
      totalWorkspaces: raw.totalWorkspaces,
    };
    const a = Space.create(props, id).getValue();
    return a;
  }

  toOwnerDTO(s: Space): SpaceOwnerDTO {
    const output: SpaceOwnerDTO = {
      id: s.id.value,
      ownerId: s.owner.value,
      maxWorkspaces: s.maxWorkspaces,
      totalWorkspaces: s.totalWorkspaces,
      name: s._name,
    };
    return output;
  }
}
