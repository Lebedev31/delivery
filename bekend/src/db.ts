import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbMongoConnect = async () => {
  try {
    const mongo = process.env.DB || "";
    if (!mongo) {
      throw new Error("Переменная окружения не подключена либо не существует");
    }

    await mongoose.connect(mongo);
    console.log("База данных подключена");
  } catch (error) {
    handleMongoError(error);
    process.exit(1);
  }
};

export default dbMongoConnect;

function handleMongoError(err: unknown) {
  if (err instanceof mongoose.Error) {
    switch (err.name) {
      case "MongoNetworkTimeoutError":
        console.error("Database connection timed out");
        break;
      case "MongoAuthenticationError":
        console.error("Invalid database credentials");
        break;
      case "MongoParseError":
        console.error("Invalid connection string");
        break;
      case "MongoServerSelectionError":
        console.error("Unable to connect to the database server");
        break;
      case "MongoNetworkError":
        console.error("Network error while connecting to the database");
        break;
      case "MongoWriteConcernError":
        console.error("Write concern error");
        break;
      default:
        console.error("An unexpected error occurred:", err);
    }
  }
}
