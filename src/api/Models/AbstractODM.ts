import { Model, Schema, isValidObjectId, model, models } from 'mongoose';

export default abstract class AbstractODM<T> {
  protected schema: Schema;
  protected model: Model<T>;
  protected modelName: string;

  public static isTheIdValid(id: string | undefined): boolean {
    if (isValidObjectId(id)) {
      return true;
    }
    return false;
  }

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T | void> {
    return this.model.create({ ...obj });
  }

  public async findAll() {
    return this.model.find({});
  }

  public async findById(id: string) {
    return this.model.findById(id);
  }
}
