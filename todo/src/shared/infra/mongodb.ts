import mongoose from "mongoose";

export async function initMongoConnection(url: string) {
  console.log('.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-')
  console.log(url)
  const con = await mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    bufferCommands: false,
  });
  return con;
}
