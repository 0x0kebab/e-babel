import Versions from './components/Versions'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <button onClick={ipcHandle}>IPC Ping </button>
      <Versions></Versions>
    </>
  )
}

export default App
