export interface IGeometry {
  id?: number;
  wkt: string;
  name: string;
}

export interface IUser {
  id?: string;
  email: string;
  userName: string;
}

export interface IApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
  success: boolean;
}
