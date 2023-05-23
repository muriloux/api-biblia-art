// exampleRoutes.ts

import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import ImageController from "../controllers/ImageController";

export default class Routes {
  private ImageController: ImageController;

  constructor() {
    this.ImageController = new ImageController();
  }

  registerRoutes(fastify: FastifyInstance): void {
    fastify.get("/api/get", this.ImageController.getRandomImage);
    fastify.get(
      "/api/get/:text",
      (request: FastifyRequest, reply: FastifyReply) => {
        const { text } = request.params as { [key: string]: string };

        this.ImageController.getImageFromText(text)
          .then(() => {
            reply.code(200).send({ message: "Success", data: { text } });
          })
          .catch((error) => {
            reply.code(500).send({ message: "Internal Error", errorCode: 500 });
            console.log("Internal Error: ", error);
          });
      }
    );
  }
}
