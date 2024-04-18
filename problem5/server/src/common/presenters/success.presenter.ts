import { IResponse } from "~/interfaces/response.interface";

export class SuccessPresenter {
  create<T>(data: T): IResponse<T> {
    return {
      statusCode: 201,
      data,
    }
  }

  OK<T>(data: T): IResponse<T> {
    return {
      statusCode: 200,
      data,
    }
  }
}