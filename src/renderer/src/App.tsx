import { useState } from 'react'
import Install from './pages/Install'
import Home from './pages/Home'

function App(): Promise<React.JSX.Element> {
  const [setLocationOfBooks, locationOfBooks] = useState('')

  window.api.loadConfig.then((v) => {
    setLocationOfBooks(v['BOOKS_PATH'])
  })

  return <>{locationOfBooks.toString() == '' ? <Install /> : <Home />}</>
}

export default App
