
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export interface PictureProps {
    format: string,
    small: string,
    thumbnail: string,
    large: string,
    baseName: string;
}

export class Picture extends ValueObject<PictureProps> {

    get thumnbnail(): string {
        return this.props.thumbnail;
    }

    get small(): string {
        return this.props.small;
    }

    get large(): string {
        return this.props.large;
    }

    get format(): string {
        return this.props.format;
    }

    get baseName(): string {
        return this.props.baseName;
    };

    private constructor(props: PictureProps) {
        super(props);
    }

    public static create(props: PictureProps): Result<Picture> {
        return Result.ok<Picture>(new Picture(props));
    }
}
