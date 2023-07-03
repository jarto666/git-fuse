import { IpcRequest } from 'main/IPC/ipcRequest';

export class IpcService {
  private ipcRenderer?: IpcRendererCustom;

  public send<TRequest = {}, TResponse = {}>(
    channel: string,
    request: TRequest,
    responseChannel?: string
  ): Promise<TResponse> {
    if (!this.ipcRenderer) {
      this.initializeIpcRenderer();
    }

    const ipcRequest: IpcRequest<TRequest> = {
      body: request,
    };

    ipcRequest.responseChannel = responseChannel
      ? responseChannel
      : `${channel}_response_${new Date().getTime()}`;

    const ipcRenderer = this.ipcRenderer!;
    ipcRenderer.sendMessage(channel, ipcRequest);

    return new Promise((resolve) => {
      ipcRenderer.once<TResponse>(ipcRequest.responseChannel!, (response) => {
        return resolve(response);
      });
    });
  }

  private initializeIpcRenderer() {
    if (!window || !window.electron) {
      throw new Error(`Unable to require renderer process`);
    }
    this.ipcRenderer = window.electron.ipcRenderer;
  }
}
