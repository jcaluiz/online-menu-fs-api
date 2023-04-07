import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_DB_URL = 'mongodb://online_menu_db:27017/OnlineMenu';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  connectTimeoutMS: 30000, // aumenta o tempo limite para 30 segundos
};

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI || MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI, options);

export default connectToDatabase;
