import sharp = require("sharp");
import path = require("path");
import Templates from "./Templates";

export default class GenImgService {
  text: string;
  inputImgPath: string;
  outputImgPath: string;

  execute(txt?: string) {
    console.time("Generation time");
    try {
      this.text = txt ? txt : "Hello God";
      console.log("[GenRandomImgService] Generating image...");

      const image = sharp(this.inputImgPath);

      image.metadata().then((metadata) => {
        const { width, height, space }: sharp.Metadata = metadata;

        const templates = new Templates(
          this.text,
          width as number,
          height as number
        );

        image
          .ensureAlpha()
          .toColorspace(space === "srgb" ? "srgb" : "rgb")
          .composite([
            {
              input: Buffer.from(templates.getSvgText()),
              blend: "over",
            },
          ])

          .toFile(this.outputImgPath)
          .then(() => {
            console.log(
              `[GenRandomImgService] Image generated successfully: "${this.text}".`
            );
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
}
