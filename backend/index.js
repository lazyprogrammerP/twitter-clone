const express = require("express");
const app = express();

app.use(express.json());

const session = require("express-session");
app.use(
  session({
    secret: "rick-and-morty",
    resave: true,
    saveUninitialized: false,
  })
);

const Database = require("./database");
const validateSession = require("./middlewares/validateSession");
new Database(
  `mongodb+srv://admin:admin123@cluster0.c1lai.mongodb.net/?retryWrites=true&w=majority`
);

const PORT = 8000;

app.get("/", validateSession, (req, res) => {
  res.status(200).send("Server is up and running!");
});

// Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
