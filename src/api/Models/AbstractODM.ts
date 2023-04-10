import { Model, Schema, isValidObjectId, model, models } from 'mongoose';

/**
 * @author Luiz Alberto Carreiro Junior
 * 
 * @description Abstract class for model used to populate the database
 * @argument T Receives an interface referring to the concrete class
 * 
 * @protected schema
 * @public model
 * @protected modelName
 * 
 * @method create(): Create a document in mongodb
 * @method findAll(): Finds all documents in mongodb
 * @method findById(): Find a document in mongodb by ID
 */

export default abstract class AbstractODM<T> {
  protected schema: Schema;
  public model: Model<T>;
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

  public async create(obj: T | T[]): Promise<T | T[] | void> {
    return this.model.create({ ...obj });
  }

  public async findAll() {
    return this.model.find({});
  }

  public async findById(id: string) {
    return this.model.findById(id);
  }
}
