import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { ValueObject } from "../../../shared/domain/ValueObject";
import bcrypt from "bcryptjs";

/**
 * Params that build a correct Password
 */
export interface PasswordProps {
  value: string;
  isHashed: boolean;
}

/**
 * Represent a valid Password value-object of the User Entity
 */
export class Password extends ValueObject<PasswordProps> {

  private static maxValidPasswordLength: number = 32;
  private static minValidPasswordLength: number = 6;

  get value(): string {
    return this.props.value;
  }

  get isHashed(): boolean {
    return this.props.isHashed;
  }

  private constructor(props: PasswordProps) {
    super(props);
  }

  public compare(rawPass: string): boolean {
    return bcrypt.compareSync(rawPass, this.value);
  }

  /**
   *  Verify if the rawValue is null, unfined or empty. 
   * @param rawPass string
   */
  public static scan(rawPass: string): Result<string> {
    const guardResult = Guard.againstNullOrUndefined(rawPass, "password");
    if (!guardResult.isSuccess)
      return Result.fail(guardResult.error);

    return Result.ok(rawPass);
  }

  /**
   * Chek if the value has a length according to the bussines logic
   * @param password the raw value to validate
   */
  private static hasValidLength(password: string): boolean {
    return (
      password.length >= this.minValidPasswordLength &&
      password.length <= this.maxValidPasswordLength
    );
  }
  /**
   *
   * @param password the raw value
   */
  private static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  /**
   * Create a new Password appliying validations
   * @Return Result: contains information about the process wheter is failure or ok
   * @param rawPassword
   */
  public static async create(props: PasswordProps): Promise<Result<Password>> {

    if (!props.isHashed) {
      // Appliying validations
      if (!this.hasValidLength(props.value))
        return Result.fail<Password>(["Invalid password length"]);
      // Let's hash it
      props.value = await this.hashPassword(props.value);
      props.isHashed = true;
    }

    return Result.ok<Password>(
      new Password({
        value: props.value,
        isHashed: props.isHashed,
      })
    );
  } // End of create method

}
