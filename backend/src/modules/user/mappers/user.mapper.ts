
import { UserDTO } from './user.dto';
import { User } from '../domain/User';
import { Email } from '../domain/Email';
import { Password } from '../domain/Password';
import { Username } from '../domain/Username';
import { Result } from '../../../shared/core/Result';
import { UserPersistenceDTO } from './repository.dto';
import { JWTPayload } from '../domain/jwt';
import { EntityId } from '../../../shared/domain/EntityId';
import { EditableUserProps } from '../domain/props';
import { Picture } from '../domain/Picture';
import { Mapper } from '../../../shared/core/Mapper';
import moment from 'moment';

export class UserMapper implements Mapper<User, UserDTO, UserPersistenceDTO>{


    public async toDomain(rawData: UserPersistenceDTO): Promise<User> {
        const { first, last } = rawData.name;
        const email: Result<Email> = Email.create({ value: rawData.email });
        const password: Result<Password> = await Password.create({ value: rawData.password, isHashed: true });
        const username: Result<Username> = Username.create({
            first: first,
            last: last ? last : '',
        });
        const id = EntityId.from(rawData.id);
        let picture = null;
        if (rawData.picture) {
            picture = Picture.create({
                format: rawData.picture.format,
								keyName: rawData.picture.keyName,
            }).getValue();
        }
        return User.create({
            email: email.getValue(),
            password: password.getValue(),
            username: username.getValue(),
            isEmailVerified: rawData.isEmailVerified,
            picture, createdAt: rawData.createdAt,
        }, id.getValue()).getValue();
    };

    public toPersistence(user: User): UserPersistenceDTO {

        return {
            name: {
                first: user.username.first,
                last: user.username.last,
            },
            email: user.email.value,
            password: user.password.value,
            isEmailVerified: user.isEmailVerfied,
            createdAt: user.createdAt,
            id: user.id.value,
            picture: user.picture ? {
                keyName: user.picture.keyName,
                format: user.picture.format,
            } : null,
        }
    };

    public toDTO(user: User): UserDTO {
        const picture = user.picture?.raw ? user.picture.raw : undefined;
        return {
            name: {
                first: user.username.first,
                last: user.username.last,
            },
            email: user.email.value, createdAt: user.createdAt,
            isEmailVerified: user.isEmailVerfied,
            id: user.id.value,
            profilePicture: picture,
        }
    };

    public toTokenPayload(raw: UserDTO): JWTPayload {

        const payload: JWTPayload = {
            email: raw.email,
            userId: raw.id,
            isEmailVerified: raw.isEmailVerified,
            username: {
                ...raw.name
            }
        }

        return payload;
    }

    public async mapToEditableProps(rawData: any, user: User): Promise<Result<EditableUserProps>> {
        // Validation
        const usernameOrError = Username.create({
            first: rawData.username.first,
            last: rawData.username.last
        });

        const pictureOrError = Picture.create({
            format: rawData.picture.format,
            keyName: rawData.keyName
        });
        const isDate = moment.isDate(rawData.dob);

        const combineResult = Result.combine([
            usernameOrError
        ]);

        // Operation
        const username = usernameOrError.isSuccess ?
            usernameOrError.getValue() : user.username;
        const picture = pictureOrError.isSuccess ?
            pictureOrError.getValue() : user.picture;
        const bio = rawData.bio;

        // Mapping new Values
        let out: EditableUserProps = {
            username,
            picture,
        };

        return Result.ok(out);
    }
}
