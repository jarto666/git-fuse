import { IpcRequest } from 'main/IPC/ipcRequest';

declare global {
  interface IpcRendererCustom {
    sendMessage<TReq>(channel: string, args: IpcRequest<TReq>): void;
    on<TResp>(
      channel: string,
      func: (args: TResp) => void
    ): (() => void) | undefined;
    once<TResp>(channel: string, func: (args: TResp) => void): void;
  }

  interface Window {
    electron: {
      ipcRenderer: IpcRendererCustom;
    };
  }
}

export {};
