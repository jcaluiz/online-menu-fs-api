export interface ICategory {
  _id?: string | undefined;
  parent: ICategory | null,
  name: string,
}
