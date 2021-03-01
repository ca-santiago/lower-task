import {ManagedList} from "../../../../shared/core/ManagedList";
import { Collaborator } from "../Collaborator";

export class CollabCollection extends ManagedList<Collaborator> {
  private constructor(props: Collaborator[]) {
    super(props);
  }

  public compare(a: Collaborator, b: Collaborator): boolean {
    return a.id.value === b.id.value;
  }

  public exist(c: Collaborator): boolean {
    return !this.items.find((theCollab) => c.id.value === theCollab.id.value);
  }

  public static create(props: Collaborator[]): CollabCollection {
    return new CollabCollection(props);
  }
}
