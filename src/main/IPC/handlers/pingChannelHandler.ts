import { IpcChannelBase } from '../ipcChannel';

export type PingChannelRequest = {
  message: string;
};

export type PingChannelResponse = {
  answer: string;
};

export class PingChannel extends IpcChannelBase<
  PingChannelRequest,
  PingChannelResponse
> {
  get name(): string {
    return 'ping';
  }

  protected handleInternal(args: PingChannelRequest): PingChannelResponse {
    console.log(args);

    const res: PingChannelResponse = {
      answer: `pong - ${args.message}`,
    };
    return res;
  }
}
