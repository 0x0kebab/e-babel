import { useState } from 'react'

function Install(): React.JSX.Element {
  const [locationOfBooks, setLocationOfBooks] = useState('')

  return (
    <>
      <h1 className="text-3xl font-bold underline">Welcome to E-Babel</h1>
      <h2>Location of folder where your books located</h2>

      <input type="text" onChange={(v) => setLocationOfBooks(v.currentTarget.value)} />
      <button
        onClick={() => window.electron.ipcRenderer.send('install', 1, locationOfBooks)}
        className="border"
      >
        Submit
      </button>
    </>
  )
}

export default Install
