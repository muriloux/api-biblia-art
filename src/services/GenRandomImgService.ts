import sharp = require("sharp");
import path = require("path");

export default class GenRandomImgService {
  text: string;
  inputImgPath: string;
  outputImgPath: string;

  constructor() {
    this.text = "";
    this.inputImgPath = path.resolve(
      __dirname,
      "..",
      "..",
      "image",
      "image.jpg"
    );
    this.outputImgPath = path.resolve(
      __dirname,
      "..",
      "..",
      "image",
      "output.webp"
    );
  }

  execute(text?: string) {
    console.time("Generation time");
    try {
      this.text = text ? text : "Hello God";
      console.log("[GenRandomImgService] Generating image...");

      const image = sharp(this.inputImgPath);

      image.metadata().then((metadata) => {
        const { width, height, space }: sharp.Metadata = metadata;

        const svgTextTemplate = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <text x="50%" y="50%" text-anchor="middle" font-family="Arial" 
          font-size="${(width as number) / 10}" fill="black">
            ${this.text}
          </text>
        </svg>
        `;

        image
          .ensureAlpha()
          .toColorspace(space === "srgb" ? "srgb" : "rgb")
          .composite([
            {
              input: Buffer.from(svgTextTemplate),
              blend: "over",
            },
          ])
          .toFile(this.outputImgPath)
          .then(() => {
            console.log(`[GenRandomImgService] Image generated successfully.`);
            console.timeEnd("Generation time");
          })
          .catch((error) =>
            console.error(`Error adding text to image: ${error}`)
          );
      });
    } catch (error) {
      console.log(`Error on GenRandomImgService: ${error}`);
    }
  }
}
