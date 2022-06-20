import fs from 'fs/promises';
import sharp from 'sharp';

interface ResizeImageData {
  width: number;
  height: number;
  fullImagePath: string;
  thumbImagePath: string;
}

// resize an image of given path and saves it to the given thumb path
// also returns the buffer of resized image on success
const resizeImage = async ({
  width,
  height,
  fullImagePath,
  thumbImagePath,
}: ResizeImageData): Promise<Buffer> => {
  const data: Buffer | null = await fs
    .readFile(fullImagePath)
    .catch(() => null);

  if (!data) {
    return Promise.reject();
  }

  const imageBuffer: Buffer | null = await sharp(data)
    .resize(width, height)
    .toBuffer()
    .catch(() => null);

  if (!imageBuffer) {
    return Promise.reject();
  }

  return fs
    .writeFile(thumbImagePath, imageBuffer)
    .then(() => {
      return imageBuffer;
    })
    .catch(() => {
      return Promise.reject();
    });
};

export default { resizeImage };
