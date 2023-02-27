import client from "./connection";

const connectDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Database connected!");
};

export default connectDatabase;
