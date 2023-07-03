import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IpcRequest } from './IPC/ipcRequest';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage<TReq>(channel: string, args: IpcRequest<TReq>) {
      ipcRenderer.send(channel, args);
    },
    on<TResp>(channel: string, func: (args: TResp) => void) {
      const subscription = (_event: IpcRendererEvent, args: TResp) =>
        func(args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once<TResp>(channel: string, func: (args: TResp) => void) {
      ipcRenderer.once(channel, (_event, args) => func(args));
    },
  },
});
