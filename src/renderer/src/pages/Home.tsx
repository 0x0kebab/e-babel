import { useEffect, useMemo, useState } from 'react'
import { EmbedPDF } from '@embedpdf/core/react'
import { createPluginRegistration } from '@embedpdf/core'
import { ViewportPluginPackage } from '@embedpdf/plugin-viewport/react'
import { ScrollPluginPackage } from '@embedpdf/plugin-scroll/react'
import { RenderPluginPackage } from '@embedpdf/plugin-render/react'
import { usePdfiumEngine } from '@embedpdf/engines/react'
import { MainViewerArea } from '@renderer/components/MainViewerArea'
import {
  DocumentManagerPluginPackage,
  useDocumentManagerCapability
} from '@embedpdf/plugin-document-manager/react'

function Home(): React.JSX.Element {
  const [books, setBooks] = useState<string[]>([])
  const { engine, isLoading } = usePdfiumEngine()

  useEffect(() => {
    window.api.loadBooks.then((v) => {
      setBooks(v)
    })
  }, [])

  const plugins = useMemo(
    () => [
      createPluginRegistration(DocumentManagerPluginPackage, { initialDocuments: [] }),
      createPluginRegistration(ViewportPluginPackage),
      createPluginRegistration(ScrollPluginPackage),
      createPluginRegistration(RenderPluginPackage)
    ],
    []
  )

  if (isLoading || !engine) {
    return <div>Loading PDF Engine...</div>
  }

  return (
    <EmbedPDF engine={engine} plugins={plugins}>
      {({ pluginsReady, activeDocumentId }) =>
        !pluginsReady ? (
          <div>Loading viewer...</div>
        ) : (
          <HomeContent books={books} activeDocumentId={activeDocumentId} />
        )
      }
    </EmbedPDF>
  )
}

function HomeContent({
  books,
  activeDocumentId
}: {
  books: string[]
  activeDocumentId: string | null
}): React.JSX.Element {
  const { provides: docManager } = useDocumentManagerCapability()

  const openBook = async (path: string) => {
    if (!docManager) return

    const base64 = await window.api.loadBook(path)

    const binaryString = atob(base64)
    const bytes = new Uint8Array(binaryString.length)

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    const opened = await docManager
      .openDocumentBuffer({ name: path.split(/[\\/]/).pop() + '', buffer: bytes.buffer })
      .toPromise()

    console.log(opened)
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Welcome to E-Babel</h1>
      <h2>Here are your books</h2>

      {books.map((v) => (
        <p className="block" key={v} onClick={() => void openBook(v)}>
          {v.split(/[\\/]/).pop()}
        </p>
      ))}

      {activeDocumentId && <MainViewerArea activeDocumentId={activeDocumentId} />}
    </>
  )
}

export default Home
