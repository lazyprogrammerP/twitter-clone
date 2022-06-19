const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);

class Database {
  constructor(connectionURI) {
    this.connectionURI = connectionURI;
    this.connect();
  }

  connect() {
    mongoose
      .connect(this.connectionURI)
      .then(() => {
        console.log("Connection established with database.");
      })
      .catch((err) => {
        console.log("Error connecting to the database.");
      });
  }
}

module.exports = Database;
