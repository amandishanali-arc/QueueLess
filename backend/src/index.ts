import { app } from "./app.js";
import { config } from "./config.js";

const server = app.listen(config.port, () => {
  console.log(`QueueLess API is running on http://localhost:${config.port}`);
});

server.on("error", (error) => {
  console.error("Failed to start QueueLess API:", error.message);
  process.exitCode = 1;
});
