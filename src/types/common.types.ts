export interface IMessage {
  message: string;
}

export interface ICommonRes<T> extends IMessage {
  data: T;
}

export interface IError extends Error {
  status: number;
}

interface IIndex {
  [key: string]: any;
}

export type IRequest = IIndex;
