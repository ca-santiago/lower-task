import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { DescriptionProps } from "./types";

export class Description extends ValueObject<DescriptionProps> {
	public static maxLenght: number = 256;

  constructor(props: DescriptionProps){
	  super(props);
	}

	public static create(props: DescriptionProps): Result<Description> {

	  return Result.ok(new Description(props));
	}
}
