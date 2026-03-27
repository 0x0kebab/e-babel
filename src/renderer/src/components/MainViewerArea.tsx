import { DocumentContent } from '@embedpdf/plugin-document-manager/react'
import { RenderLayer } from '@embedpdf/plugin-render/react'
import { Scroller } from '@embedpdf/plugin-scroll/react'
import { Viewport } from '@embedpdf/plugin-viewport/react'

export const MainViewerArea = ({
  activeDocumentId
}: {
  activeDocumentId: string
}): React.JSX.Element => {
  // If no document is selected, show a placeholder
  if (!activeDocumentId) return <div>No document selected</div>

  return (
    <DocumentContent documentId={activeDocumentId}>
      {({ isLoading, isError, isLoaded }) => (
        <>
          {isLoading && <>loading</>}
          {isError && <>error</>}

          {isLoaded && (
            <Viewport documentId={activeDocumentId}>
              <Scroller
                documentId={activeDocumentId}
                renderPage={({ width, height, pageIndex }) => (
                  <div style={{ width, height }}>
                    <RenderLayer documentId={activeDocumentId} pageIndex={pageIndex} />
                  </div>
                )}
              />
            </Viewport>
          )}
        </>
      )}
    </DocumentContent>
  )
}
