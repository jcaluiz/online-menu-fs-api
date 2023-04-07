import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_DB_URL = 'mongodb://localhost:27017/OnlineMenu';

const options = {
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  serverSelectionTimeoutMS: 5000, // aumenta o tempo limite para 5 segundos
};

const connectToDatabase = async (
  mongoDatabaseURI = MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI, options).then(() => console.log('connected'))
  .catch((e) => console.log(e));

export default connectToDatabase;
