import { EntityId } from "../../../shared/domain/EntityId";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

import { Result } from "../../../shared/core/Result";

import { Email } from "./Email";
import { Password } from './Password'
import { Username } from "./Username";
import { Picture } from "./Picture";

import { UserProps, EditableUserProps, SensibleUserProps } from "./props";
import { Nullable } from "../../../shared/types/Nullable";

export class User extends AggregateRoot<UserProps>{

  get username(): Username {
    return this.props.username;
  }

  get password(): Password {
    return this.props.password;
  }

  get email(): Email {
    return this.props.email;
  }

  get isEmailVerfied(): boolean {
    return this.props.isEmailVerified;
  }

  get createdAt(): string {
    return this.props.createdAt;
  }

  get picture(): Nullable<Picture> {
    return this.props.picture;
  }

  constructor(props: UserProps, id?: EntityId) {
    super(props, id);
  }


  public static create(props: UserProps, id?: EntityId): Result<User> {

    const newUser: User = new User({
      ...props,
    }, id);

    if (!!id === false) {
      newUser.setVerifiedEmail(false);
    }

    return Result.ok<User>(newUser);
  }

  public updateData(data: EditableUserProps) {
    this.props = {
      ...this.props,
      ...data
    }
    return this;
  }

  public updateSensibleData(data: SensibleUserProps) {
    this.props = {
      ...this.props,
      ...data
    }
    return this;
  }

  public setVerifiedEmail(option: boolean): any {
    this.props.isEmailVerified = option;
  }

  public updatePicture(picture: Picture | null) {
    this.props.picture = picture;
  }

}