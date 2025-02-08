export class CustomResponse {
  public status: number;

  public body: any;

  constructor(status: number, body?: any) {
    this.body = body;
    this.status = status;
  }
}
