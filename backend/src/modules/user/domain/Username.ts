import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';


export interface UsernamePorps {
  first: string;
  last: string;
}

export class Username extends ValueObject<UsernamePorps> {

  private static maxNameLength: number = 32;
  private static minNameLength: number = 2;

  get first(): string {
    return this.props.first;
  }

  get last(): string {
    return this.props.last;
  }

  private constructor(props: UsernamePorps) {
    super(props);
  }

  private static hasValidLength(value: string, min: number, max: number): boolean {
    return (
      value.length <= max &&
      value.length >= min);
  }

  public static create(props: UsernamePorps): Result<Username> {
    // Test every single name
    const validLenght = this.hasValidLength(props.first.trim(), this.minNameLength, this.maxNameLength)
    if (validLenght === false)
      return Result.fail(['Invalid name Lenght']);

    return Result.ok<Username>(
      new Username(props)
    );
  }
}
