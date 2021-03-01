import { ManagedList } from "../../../../shared/core/ManagedList";
import { Task } from "../Task";

export class TaskCollection extends ManagedList<Task> {
  private constructor(props: Task[]) {
    super(props);
  }

  public compare(a: Task, b: Task): boolean {
    return a.id.value === b.id.value;
  }

  public exist(t: Task): boolean {
    return !this.items.find((theTask) => t.id.value === theTask.id.value);
  }

  public static create(props: Task[]): TaskCollection {
    return new TaskCollection(props);
  }
}
