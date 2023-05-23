import fastify from "fastify";
import Routes from "./routes";

const app = fastify();
const routes = new Routes();

routes.registerRoutes(app);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`[Server] Listening on ${address}`);
});
