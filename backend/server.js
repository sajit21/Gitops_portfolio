import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.routes.js";
import articleRoute from "./routes/article.routes.js";
import bookRoute from "./routes/book.route.js";
import videoRoute from "./routes/video.routes.js";
import testimonalRoute from "./routes/testimonal.routes.js";
import contactRoute from "./routes/contact.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

const port = process.env.PORT || 8000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // frontend origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/api/auth", authRoute);
app.use("/api/article", articleRoute);
app.use("/api/book", bookRoute);
app.use("/api/video", videoRoute);
app.use("/api/testimonal", testimonalRoute);
app.use("/api/contact", contactRoute);

app.listen(port, async () => {
  try {
    // await createTable();
    // await updateTable();
    console.log(`server is running on ${port}`);
  // } catch (_error) {    //error -> _error
  } catch {
    console.log("something went wrong while connecting yeta");
  }
});
