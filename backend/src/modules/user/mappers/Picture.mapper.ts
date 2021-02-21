
import { Picture } from "../domain/Picture";

export function MapPictureToDTO(picture: Picture) {
    const mapped = {
        url: picture.getAccessURL,
        name: picture.keyName,
        format: picture.format,
    }
    return mapped;
}
