export interface ICategory {
  _id?: string | undefined;
  id?: string;
  parent?: ICategory | null,
  name: string,
}
