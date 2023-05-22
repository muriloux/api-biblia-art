import fastify from "fastify";
import axios from "axios";
import sharp = require("sharp");

const app = fastify();

// Endpoint to generate an image with a random string
app.get("/api/generate-image", async (request, reply) => {
  try {
    // Fetch a random string from the external API

    //const response = await axios.get("https://api.example.com/random-string");
    //const randomString = response.data;

    const randomString = "Hello World";

    // Generate the image with the random string using Sharp
    const imageBuffer = await generateImageWithText(
      "./image/image.webp",
      "./image/image.jpg",
      randomString
    );

    // Send the image as a response
    reply.type("image/png").send(imageBuffer);
  } catch (error) {
    console.error("Error fetching random string from external API:", error);
    reply.code(500).send("Internal Server Error");
  }
});

// Function to generate an image with the given text using Sharp
function generateImageWithText(
  inputImgPath: string,
  outputImgPath: string,
  text: string
): void {
  const image = sharp("image/image.webp");

  sharp(inputImgPath)
    .jpeg() // Change the format if needed
    .composite([
      {
        input: Buffer.from(`
        <svg>
          <text x="10" y="50" font-family="Arial" font-size="30" fill="black">
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

  // Start the server
}

app.listen(
  {
    port: 3000,
  },
  (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  }
);
