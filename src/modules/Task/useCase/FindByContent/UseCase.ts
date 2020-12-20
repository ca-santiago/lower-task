import { Result } from "../../../../shared/core/Result";
import { IUseCase } from "../../../../shared/core/UseCase";
import { TaskMapper } from "../../mapper/TaskMapper";
import { ITaskRepo } from "../../repository/ITaskRepo";
import { FindTaskByContentDTO } from "./DTO";


export class FindTaskByContentUseCase implements IUseCase<FindTaskByContentDTO, Result<any>>{

    constructor(
        private readonly repo: ITaskRepo,
        private readonly mapper: TaskMapper
    ) { }

    async run(request: FindTaskByContentDTO): Promise<Result<any>> {

        const findResult = await this.repo.findByTitleOrContent(request.match);

        const res = findResult.map(theTask => this.mapper.toDTO(theTask))

        return Result.ok(res);
    }

}   