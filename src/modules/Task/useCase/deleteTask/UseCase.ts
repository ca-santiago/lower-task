
import { Result } from "../../../../shared/core/Result";
import { IUseCase } from "../../../../shared/core/UseCase";
import { EntityId } from "../../../../shared/domain/EntityId";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { ITaskRepo } from "../../repository/ITaskRepo";
import { CreateTaskDTO } from "../createTask/DTO";
import { DeleteTaskDTO } from "./DTO";

export class DeleteTaskUseCase implements IUseCase<DeleteTaskDTO, Result<any>>{

    constructor(private readonly repo: ITaskRepo) { }

    async run(request: DeleteTaskDTO): Promise<Result<any>> {

        const idOrError = EntityId.from(request.taskId);
        if (idOrError.isSuccess === false)
            return new UseCasesErrors.InvalidParamError(['Invalid provided id']);

        await this.repo.delete(idOrError.getValue());

        return Result.ok();
    }

}
