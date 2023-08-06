import express from "express";
import morgan from "morgan";
import cors from "cors";
import routerPushNotification from "./routers/push-notification.router.js";
const app = express();
const port = 3000;
app.use(morgan("combined"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/", routerPushNotification);
app.get("/", (req, res) => {
  res.send("Server send message");
});

app.listen(port, () => {
  console.log(`PORT: http://localhost:${port}`);
});
