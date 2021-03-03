import mongoose from "mongoose";

export async function initMongoConnection(url: string) {
  const con = await mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    bufferCommands: false,
  });
  return con;
}
