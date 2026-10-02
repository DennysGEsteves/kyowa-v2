import { AxiosRequestConfig } from 'axios'

export interface httpResponse<T = void> {
  data: T | any;
  status: number;
  statusText: string;
}
export interface IGet {
  url: string;
  config?: AxiosRequestConfig;
}

export interface IPut {
  url: string;
  data: any;
  config?: AxiosRequestConfig;
}

export interface IPost {
  url: string;
  data: any;
  config?: AxiosRequestConfig;
}

export interface IPath {
  url: string;
  data: any;
  config?: AxiosRequestConfig;
}

export interface IDelete {
  url: string;
  config?: AxiosRequestConfig;
}
