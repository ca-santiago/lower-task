
import { Guard } from "../../../../shared/core/Guard";
import { Result } from "../../../../shared/core/Result";
import { IUseCase } from "../../../../shared/core/UseCase";
import { EntityId } from "../../../../shared/domain/EntityId";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { TaskContent } from "../../domain/Content";
import { TaskTitle } from "../../domain/Tittle";
import { ITaskRepo } from "../../repository/ITaskRepo";
import { UpdateTaskDTO } from "./DTO";


export class UpdateTaskUseCase implements IUseCase<UpdateTaskDTO, Result<any>>{

    constructor(
        private readonly taskRepo: ITaskRepo,
    ) { }

    async run(request: UpdateTaskDTO): Promise<Result<any>> {

        const { content, title, userId, taskId } = request;

        const contentOrDefault = Guard.optionalInput(content, '');
        const titleOrDefault = Guard.optionalInput(title, '');

        if (contentOrDefault === '' && titleOrDefault === '')
            return new UseCasesErrors.Conflict(['Should provide title or content.']);

        // Creating entityId instacen form the given taksId
        const taskIdOrError = EntityId.from(taskId);
        if (taskIdOrError.isSuccess === false)
            return new UseCasesErrors.NotFound();

        // finding
        const TaskOrError = await this.taskRepo.findById(taskIdOrError.getValue());
        if (!TaskOrError)
            return new UseCasesErrors.NotFound();
			
        // Validate task owner or have permisions
        if (TaskOrError.owner.value !== userId)
            return new UseCasesErrors.Unauthorized();

        // Instance creation
        const contentInstance = TaskContent.create({ value: contentOrDefault });
        const titleInstace = TaskTitle.create({ value: titleOrDefault });

        let combieResult = Result.combine([contentInstance, titleInstace]);
        if (combieResult.isSuccess === false)
            return new UseCasesErrors.InvalidParamError(combieResult.error);

        // Udpating
        const updateContentResult = TaskOrError.updateContent(contentInstance.getValue());
        const updateTitleResult = TaskOrError.updateTitle(titleInstace.getValue());

        // Looking for conflicts
        combieResult = Result.combine([updateContentResult, updateTitleResult]);
        if (combieResult.isSuccess === false)
            return new UseCasesErrors.Conflict(combieResult.error);

        // saving changes
        this.taskRepo.save(TaskOrError);

        return Result.ok();
    }

}
