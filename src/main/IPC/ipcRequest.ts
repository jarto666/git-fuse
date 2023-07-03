export interface IpcRequest<TRequest> {
  responseChannel?: string;

  body?: TRequest;
}
