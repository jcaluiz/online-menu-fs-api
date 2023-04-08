import mongoose from 'mongoose';
import 'dotenv/config';
import CategoryODM from './CategoryODM';
import * as data from '../data/categories.json';

const MONGO_DB_URL = 'mongodb://online_menu_db:27017/OnlineMenu';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  connectTimeoutMS: 30000, // aumenta o tempo limite para 30 segundos
};

const connectToDatabase = async (
  mongoDatabaseURI = process.env.MONGO_URI || MONGO_DB_URL,
) => {
  await mongoose.connect(mongoDatabaseURI, options);
  const categoryODM = new CategoryODM();
  await categoryODM.model.deleteMany({});
  const newData = Object.values(data).filter((item) => !Array.isArray(item));
  await categoryODM.model.insertMany(newData);
};

export default connectToDatabase;
