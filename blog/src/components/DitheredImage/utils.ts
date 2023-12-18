// @ts-expect-error no types :(
import RgbQuant from "rgbquant";
import { readFile, writeFile, stat } from "fs/promises";
import * as nodepath from "path";
import { createCanvas, loadImage } from "canvas";
import type { PathLike } from "fs";

function typeOf(val: any) {
  return Object.prototype.toString.call(val).slice(8, -1);
}

// Function to process the image
async function processImage(imagePath: PathLike) {
  const data = await readFile(imagePath);
  console.log("data: ", data);
  const img = await loadImage(data);
  console.log("image: ", img);

  console.log("typeof 2 : ", typeOf(img));
  const can = createCanvas(img.width, img.height);
  console.log("can: ", can);
  console.log("typeof 1 : ", typeOf(can));
  const ctx = can.getContext("2d");
  console.log("WIDTH : ", img.width);
  console.log("Height : ", img.height);
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const imgd = ctx.getImageData(0, 0, img.width, img.height);

  const CMYK = [
    [0, 0, 0],
    [255, 255, 0],
    [0, 255, 255],
    [255, 0, 255],
    [255, 255, 255],
  ];
  const GREEN_MONOCHROME = [
    [238, 255, 219],
    [29, 56, 1],
  ];
  const q = new RgbQuant({
    // colors: 256,
    // palette: GREEN_MONOCHROME,
    palette: CMYK,
    reIndex: true,
  });
  // q.sample(imgd.data, img.width);
  // const pal = q.palette(true);
  // const out = q.reduce(imgd.data, 1, "FloydSteinberg");
  const out = q.reduce(imgd.data, 1, "FloydSteinberg");

  // You might want to do something with 'out' here, e.g., render it
  return { out, width: img.width, height: img.height };
}

async function readImage(): Promise<string | null> {
  const filePath = nodepath.resolve(process.cwd(), "public", "example.jpg"); // Update the path to your image

  const exists = await stat(filePath)
    .then(() => true)
    .catch(() => false);

  if (exists) {
    try {
      const fileBuffer = await readFile(filePath);
      const base64String = fileBuffer.toString("base64");
      // TODO: need to adjust mime type
      const buffer = Buffer.from(base64String, "base64");
      return new Uint8Array(buffer);
    } catch (_) {
      // This is not cross-platform because readFile retruns content directories in
      // on freeBSD
      return null;
    }
  }

  return null;
}

function getDitheredFilePath(filePath) {
  const dir = nodepath.dirname(filePath);
  const ext = nodepath.extname(filePath);
  const base = nodepath.basename(filePath, ext);

  return nodepath.join(dir, `${base}_dithered${ext}`);
}

function uint8ArrayToBase64(buffer) {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function getBasename(path: string) {
  return nodepath.posix.basename(path);
}

export async function proccessDitheredImage(
  imagePath: string,
  saveImage = true
): Promise<string> {
  const basename = getBasename(imagePath);
  const { out, width, height } = await processImage(imagePath);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  console.log("out:", out);
  console.log("width:", width);
  console.log("height:", height);
  console.log("ctx:", ctx);

  // Create an ImageData object from the Uint8Array
  // const imageData = new ImageData(new Uint8ClampedArray(out), width, height);
  // console.log("Image data: ", imageData);
  const imageData = await ctx.createImageData(width, height);
  const u8 = new Uint8ClampedArray(out);
  imageData.data.set(u8);

  if (saveImage) {
    const b64encoded = uint8ArrayToBase64(u8);

    const newFileName = getDitheredFilePath(basename);

    await writeFile(newFileName, b64encoded);
  }

  ctx.putImageData(imageData, 0, 0);

  // Convert the canvas to a data URL
  const dataUrl = canvas.toDataURL();
  return dataUrl;
}
