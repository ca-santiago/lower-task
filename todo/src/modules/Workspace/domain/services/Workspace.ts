import { Result } from "../../../../shared/core/Result";
import { EntityId } from "../../../../shared/domain/EntityId";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { Space } from "../Space";
import { Task } from "../Task";
import { Workspace } from "../Workspace";

export class WorkspaceService {
  async addTaskToWorkspace(
    accountId: EntityId,
    space: Space,
    ws: Workspace,
    task: Task,
  ): Promise<Result<void>> {

    if(!ws.isCollab(accountId) && accountId.value !== ws.owner.value)
      return new UseCasesErrors.Unauthorized(); 

    let res = ws.addTask(task);
    if(res.isSuccess == false)
      return new UseCasesErrors.Conflict(res.error); 
    
    res = space.updateWorkspace(ws);
    if(res.isSuccess == false)
      return new UseCasesErrors.Conflict(res.error); 

    return Result.ok();
  }
}
