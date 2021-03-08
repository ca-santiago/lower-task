import { BaseController } from "../../../../shared/infra/BaseController";
import { GetSpaceByOwnerDTO } from "../../useCases/Space/GetSpaceByOwner/DTO";
import { GetSpaceByOwnerUseCase } from "../../useCases/Space/GetSpaceByOwner/UseCase";

export class GetSpaceByOwnerController extends BaseController {
  constructor(private readonly useCase: GetSpaceByOwnerUseCase) {
    super();
  }

  async executeImpl(req, res) {
    const { accountId } = req.body;
    const { id } = req.params;

    const dto: GetSpaceByOwnerDTO = {
      accountId,
      ownerId: id || accountId,
    };

    const useCaseRes = await this.useCase.run(dto);
    if (useCaseRes.isSuccess === false) {
      switch (useCaseRes.constructor) {
        default:
          return this.fail(res, useCaseRes.error);
      }
    } else {
      return this.ok(res, useCaseRes.getValue());
    }
  }
}
