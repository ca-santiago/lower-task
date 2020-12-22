import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';
import { ValueObject } from '../../../shared/domain/ValueObject';


export interface EmailProps {
  value: string
}

/**
 * Represent a valid Email value-object of the User Entity
 */
export class Email extends ValueObject<EmailProps> {

  private static regExEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  get value(): string {
    return this.props.value;
  }

  private constructor(value: EmailProps) {
    super(value);
  }

  private static isValidEmail(email: string): boolean {
    return this.regExEmail.test(email);
  }

  public static create(props: EmailProps): Result<Email> {

    if (!this.isValidEmail(props.value)) return Result.fail<Email>(['Email address not valid']);

    return Result.ok<Email>(
      new Email(props)
    );
  }
}