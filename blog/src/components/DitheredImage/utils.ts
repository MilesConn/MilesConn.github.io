import { writeFile, stat } from "fs/promises";
import * as nodepath from "path";
import { PNG } from "pngjs";
import { createCanvas, loadImage } from "canvas";
import { applyPalette, applyPaletteSync, utils } from "image-q";

// Get the dithered file path
function getDitheredFilePath(imagePath: string) {
  const dir = "/" + nodepath.dirname(imagePath);
  const ext = nodepath.extname(imagePath);
  const base = nodepath.basename(imagePath, ext);
  return nodepath.join(dir, `${base}_dithered.png`);
}

// Check if file exists
async function fileExists(filePath: string): Promise<boolean> {
  try {
    console.log("FILE PATH : ", filePath);
    await stat(filePath.substring(1));
    console.log("IT EXISTS!");
    return true;
  } catch {
    return false;
  }
}

// Process and dither the image
export async function processDitheredImage(imagePath: string): Promise<string> {
  const ditheredPath = getDitheredFilePath(imagePath);

  // Check if the dithered image already exists
  if (await fileExists(ditheredPath)) {
    return ditheredPath;
  }

  // Load the image using canvas
  const img = await loadImage(imagePath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const imageData = ctx.getImageData(0, 0, img.width, img.height);

  // @ts-expect-error differing imports for ImageData
  const inPointContainer = utils.PointContainer.fromImageData(imageData);

  // This we don't need to do if we want to use stylized palettes
  // const palette = buildPaletteSync([inPointContainer], {
  //   colorDistanceFormula: "euclidean", // optional
  //   paletteQuantization: "neuquant", // optional
  //   colors: 128, // optional
  //   // onProgress: (progress) => console.log("buildPalette", progress), // optional
  // });

  const palette = new utils.Palette();
  palette.add(utils.Point.createByRGBA(202, 220, 159, 255));
  palette.add(utils.Point.createByRGBA(15, 56, 15, 255));
  palette.add(utils.Point.createByRGBA(48, 98, 48, 255));
  palette.add(utils.Point.createByRGBA(139, 172, 15, 255));
  palette.add(utils.Point.createByRGBA(155, 188, 15, 255));

  // const outPointContainer = await applyPalette(inPointContainer, palette, {
  //   colorDistanceFormula: "euclidean", // optional
  //   imageQuantization: "floyd-steinberg", // optional
  //   onProgress: (progress) => console.log("applyPalette", progress), // optional
  // });

  // console.log("OUT CONTAINER", outPointContainer.toUint8Array());

  // Converting the output point container to ImageData
  // const outputImageData = new ImageData(
  //   new Uint8ClampedArray(inPointContainer.toUint8Array()),
  //   img.width,
  //   img.height
  // );

  // console.log("OUTPUT IMAGE DATA: ", outputImageData);

  // Drawing the processed image onto a new canvas
  const outputCanvas = createCanvas(img.width, img.height);
  const outputCtx = outputCanvas.getContext("2d");

  const outimageData = await outputCtx.createImageData(img.width, img.height);
  outimageData.data.set(new Uint8ClampedArray(inPointContainer.toUint8Array()));
  outputCtx.putImageData(outimageData, 0, 0);

  // Get buffer from the canvas and write to file
  const buffer = outputCanvas.toBuffer("image/png");

  // Write the processed image back to a file
  await writeFile(ditheredPath.substring(1), buffer);

  return ditheredPath;
}
