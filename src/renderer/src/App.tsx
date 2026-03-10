import { useState } from 'react'

function App(): React.JSX.Element {
  const [locationOfBooks, setLocationOfBooks] = useState('')
  window.electron.ipcRenderer.on('asynchronous-reply', (_event, arg) => {
    console.log(arg) // prints "pong" in the DevTools console
  })

  return (
    <>
      <h1 className="text-3xl font-bold underline">Welcome to E-Babel</h1>
      <h2>Location of folder where your books located</h2>

      <input type="text" onChange={(v) => setLocationOfBooks(v.currentTarget.value)} />
      <button
        onClick={() => console.log(window.electron.ipcRenderer.send('install', 0, locationOfBooks))}
        className='border'
      >Submit</button>
    </>
  )
}

export default App
