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
    console.log(error);
    process.exit(1);
  }
};

export default dbMongoConnect;
