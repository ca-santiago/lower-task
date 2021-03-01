import { ManagedList } from "../../../../shared/core/ManagedList";
import { Workspace } from "../Workspace";

export class WorkspaceCollection extends ManagedList<Workspace> {
  private constructor(props: Workspace[]) {
    super(props);
  }

  public compare(a: Workspace, b: Workspace): boolean {
    return a.id.value === b.id.value;
  }

  public exist(w: Workspace): boolean {
    return !this.items.find((theCollab) => w.id.value === theCollab.id.value);
  }

  public static create(props: Workspace[]): WorkspaceCollection {
    return new WorkspaceCollection(props);
  }
}
