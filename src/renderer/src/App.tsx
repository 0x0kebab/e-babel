import { useState } from 'react'
import Install from './pages/Install'
import Home from './pages/Home'

function App(): React.JSX.Element {
  const [locationOfBooks, setLocationOfBooks] = useState('')

  window.api.loadConfig.then((v) => {
    setLocationOfBooks(v['BOOKS_PATH'])
  })

  return (
    <>
      <button>Back</button>
      <div>{locationOfBooks == '' ? <Install /> : <Home />}</div>
    </>
  )
}

export default App
