import { IpcMainEvent } from 'electron';
import { IpcRequest } from './ipcRequest';

export abstract class IpcChannelBase<TRequest = {}, TResponse = {}> {
  abstract get name(): string;

  protected abstract handleInternal(args?: TRequest): TResponse;

  handle(event: IpcMainEvent, request: IpcRequest<TRequest>): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.name}_response`;
    }

    const response = this.handleInternal(request.body);

    event.sender.send(request.responseChannel, response);
  }
}
