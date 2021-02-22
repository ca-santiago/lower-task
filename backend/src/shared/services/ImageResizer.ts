
import jimp from 'jimp';

export type dimentions = {
  h: number;
  w: number;
}

export async function resizeImage(imgBuffer: Buffer, dim: dimentions) {
  return Promise.resolve().then(async () => {
    const file = await jimp.read(imgBuffer)
    const resizedFile = file.resize(dim.w, dim.h, jimp.RESIZE_NEAREST_NEIGHBOR).quality(90);
    return resizedFile.getBufferAsync(jimp.MIME_JPEG);
  })
}
