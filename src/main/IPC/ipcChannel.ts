import { IpcMainEvent } from 'electron';
import { IpcRequest } from './ipcRequest';

export abstract class IpcChannelBase<TRequest = {}, TResponse = {}> {
  abstract get name(): string;

  protected abstract handleInternal(args?: TRequest): Promise<TResponse>;

  async handle(
    event: IpcMainEvent,
    request: IpcRequest<TRequest>
  ): Promise<void> {
    if (!request.responseChannel) {
      request.responseChannel = `${this.name}_response`;
    }

    const response = await this.handleInternal(request.body);

    event.sender.send(request.responseChannel, response);
  }
}
