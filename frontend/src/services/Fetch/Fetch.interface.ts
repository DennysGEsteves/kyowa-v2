/* eslint-disable @typescript-eslint/no-explicit-any */
export interface httpResponse<T = void> {
  data: T;
  status: number;
  statusText: string;
}
export interface IGet {
  url: string;
  headers?: Record<string, string>;
  cacheTag?: string;
}

export interface IPut {
  url: string;
  data: any;
  headers?: Record<string, string>;
}

export interface IPost {
  url: string;
  data: any;
  headers?: Record<string, string>;
}

export interface IPath {
  url: string;
  data: any;
  headers?: Record<string, string>;
}

export interface IDelete {
  url: string;
  headers?: Record<string, string>;
}
