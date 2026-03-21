import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DEFAULT_USER_DATA_FILENAME = 'babel-user.json'

export enum MANAGER_KEY {
  INSTALL_STEP = 'INSTALL_STEP',
  BOOKS_PATH = 'BOOKS_PATH'
}

type UserDataRecord = {
  [MANAGER_KEY.INSTALL_STEP]: number
  [MANAGER_KEY.BOOKS_PATH]: string | null
}

export default class UserDataManager {
  userDataPath: string | undefined
  userDataContent: string[] | undefined

  /**
   * will check for if user data file is present, if not, create
   */
  async init(app: Electron.App): Promise<void> {
    this.userDataPath = path.join(app.getPath('sessionData'), DEFAULT_USER_DATA_FILENAME)
    try {
      await readFile(this.userDataPath)
    } catch (error: unknown) {
      if (error instanceof Error && error.message.startsWith('ENOENT')) {
        writeFile(
          this.userDataPath,
          JSON.stringify({
            INSTALL_STEP: 0,
            BOOKS_PATH: null
          })
        )
      }
    }
  }

  async read(): Promise<UserDataRecord> {
    if (!this.userDataPath) {
      throw Error('userDataPath is not initialized yet, please trigger init function first')
    }
    return JSON.parse(await readFile(this.userDataPath, { encoding: 'utf8' }))
  }

  /**
   * will check for if user data file is present, if not, throw error
   * if present, updates user data file
   */
  async write<K extends MANAGER_KEY>(key: K, value: UserDataRecord[K]): Promise<void> {
    if (!this.userDataPath) {
      throw Error('userDataPath is not initialized yet, please trigger init function first')
    }
    const content = await this.read()
    content[key] = value
    writeFile(this.userDataPath, JSON.stringify(content))
  }
}
