const express = require("express");
const app = express();

const cors = require("cors");
app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());

const validateJWT = require("./middlewares/validateJWT");

const Database = require("./database");
new Database(`mongodb+srv://admin:admin123@cluster0.c1lai.mongodb.net/?retryWrites=true&w=majority`);

const PORT = 8000;

// Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// Post Routes
const postRoutes = require("./routes/postRoutes");
app.use("/api/posts", validateJWT, postRoutes);

app.get("/", validateJWT, (req, res) => {
  res.status(200).send("Server is up and running!");
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
