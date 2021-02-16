"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapPictureToDTO = void 0;
function MapPictureToDTO(picture) {
    var mapped = {
        thumbnail: picture.thumnbnail,
        small: picture.small,
        large: picture.large,
        format: picture.format,
    };
    return mapped;
}
exports.MapPictureToDTO = MapPictureToDTO;
