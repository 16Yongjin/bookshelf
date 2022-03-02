import { Input } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { Book, useBookSearch } from '../../hooks/useBookSearch'
import { useInView } from '../../hooks/useInView'
import { BookListView } from './BookListView'

interface AddBookProps {
  onBookClick?: (b: Book) => void
}

export const AddBook: React.FC<AddBookProps> = ({ onBookClick }) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { books, loading, error, hasMore } = useBookSearch({ query, page })

  const loadMore = useCallback(
    () => hasMore && setPage((prevPage) => prevPage + 1),
    [hasMore, setPage]
  )

  const [loadMoreElement] = useInView({
    skip: loading,
    action: loadMore,
  })

  return (
    <div>
      <h1>Search book</h1>

      <Input
        aria-label="query"
        placeholder="Next UI"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      <div>{query}</div>

      <div>{error}</div>

      <BookListView books={books} onBookClick={onBookClick} />

      {!loading && hasMore && <div ref={loadMoreElement}>더 불러오기</div>}

      <div>{loading ? 'loading...' : ''}</div>
    </div>
  )
}
