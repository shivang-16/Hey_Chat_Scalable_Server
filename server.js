import { server } from "./app.js";
import ConnectToMongo from "./data/database.js";

const port = process.env.PORT || 4502;

ConnectToMongo();

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
