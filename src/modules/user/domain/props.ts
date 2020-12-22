import { Username } from "./Username";
import { Nullable } from "../../../shared/types/Nullable";
import { Picture } from "./Picture";
import { Password } from "./Password";
import { Email } from "./Email";


/**
 * Represents the data can be edited without restrictions and not requiere extra
 * validations
 */
export interface EditableUserProps extends RequiredData, OptionalData {
}

/**
 * Represents the data required for modifications
 */
export interface RequiredData {
    username: Username,
}

/**
 * Represents the optional data
 */
export interface OptionalData {
    picture: Nullable<Picture>,
}

/**
 * Data will never change
 */
export interface InmutableUserProps {
    createdAt: string
}

/**
 * Sensible data used for autentication and validations.
 */
export interface SensibleUserProps {
    password: Password,
    email: Email,
    isEmailVerified: boolean,
}

export interface UserProps extends SensibleUserProps, EditableUserProps, InmutableUserProps {

}

