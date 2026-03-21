import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      loadConfig: Promise<UserDataRecord>
      loadBooks: Promise<Array<string>>
    }
  }
}
