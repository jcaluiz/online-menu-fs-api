export default class HttpException extends Error {
  public status: number;

  constructor(status: number, message: string) {
    const errorMessage = typeof message === 'string' ? message : JSON.stringify(message);
    super(errorMessage);
    this.status = status || 500;
  }
}
