
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import {IOBjectStorageService} from "../../../shared/services/IObjectStorage";

export interface PictureProps {
    format: string,
    keyName: string,
}

export class Picture extends ValueObject<PictureProps> {

    get format(): string {
        return this.props.format;
    }

		get keyName(): string{
				return this.props.keyName;
		}

    private constructor(props: PictureProps) {
        super(props);
    }

    public static create(props: PictureProps): Result<Picture> {
        return Result.ok<Picture>(new Picture(props));
    }

		public getAccessURL(ss: IOBjectStorageService): string{
			return ss.GetSignedObjectURL(this.keyName);	
		}
}
