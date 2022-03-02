import type { NextPage } from 'next'
import { useCallback, useRef, useState } from 'react'
import Input from '@mui/material/Input'
import { useBookSearch } from '../../hooks/useBookSearch'
import { useInView } from '../../hooks/useInView'

const SearchBook: NextPage = () => {
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

      <div>
        {books.map((book, index) => (
          <div key={book.isbn + index}>
            <img src={book.thumbnail} alt={book.title} />
          </div>
        ))}
      </div>

      {!loading && hasMore && <div ref={loadMoreElement}>더 불러오기</div>}

      <div>{loading ? 'loading...' : ''}</div>
    </div>
  )
}

export default SearchBook
