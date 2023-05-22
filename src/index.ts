import fastify from "fastify";
const sharp = require("sharp");

const app = fastify();

app.get("/api/generate", async (request, reply) => {
  try {
    console.log("GET | /api/generate");
    //Should axios get the string from an external API
    const randomString = "Hello World";

    const imageBuffer = await generateImageWithText(
      "./image/image.webp",
      "./image/output.webp",
      randomString
    );
  } catch (error) {
    console.error("Error fetching random string from external API:", error);
    reply.code(500).send("Internal Server Error");
  }
});

function generateImageWithText(
  inputImgPath: string,
  outputImgPath: string,
  text: string
): void {
  const image = sharp(inputImgPath);

  image.metadata().then((metadata) => {
    const { width, height, space } = metadata;

    image
      .ensureAlpha()
      .toColorspace(space === "srgb" ? "srgb" : "rgb")
      .composite([
        {
          input: Buffer.from(`
          <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
           <text x="50%" y="50%" text-anchor="middle" font-family="Arial" font-size="${
             width / 10
           }" fill="black">
              ${text}
            </text>
          </svg>
          `),
          blend: "over",
        },
      ])
      .toFile(outputImgPath)
      .then(() => console.log("Text added to image successfully."))
      .catch((error) => console.error("Error adding text to image:", error));
  });
}

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
