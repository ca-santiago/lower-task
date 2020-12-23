
import { Picture } from "../domain/Picture";

export function MapPictureToDTO(picture: Picture) {
    const mapped = {
        thumbnail: picture.thumnbnail,
        small: picture.small,
        large: picture.large,
        format: picture.format,
    }
    return mapped;
}
