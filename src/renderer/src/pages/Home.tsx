import { useState } from 'react'
function Home(): React.JSX.Element {
  const [books, setBooks] = useState([] as Array<string>)

  window.api.loadBooks.then((v) => {
    setBooks(v)
  })

  return (
    <>
      <h1 className="text-3xl font-bold underline">Welcome to E-Babel</h1>
      <h2>Here are your books</h2>

      {books.map((v) => {
        return (
          <a key={v} href={'file://' + { v }}>
            {v.split(/[\\/]/).pop()}
          </a>
        )
      })}
    </>
  )
}

export default Home
