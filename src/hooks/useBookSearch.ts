import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'

type BookSearchParams = {
  query: string
  page: number
}

const KAKAO_API = 'fd2ccf028afaecdbe61c8655f4fc5d03'

export type Book = {
  authors: string[]
  contents: string
  datetime: string
  isbn: string
  price: number
  publisher: string
  sale_price: number
  status: string
  thumbnail: string
  title: string
  translators: string[]
  url: string
}

type SearchMetadata = {
  total_count: number
  pageable_count: number
  is_end: boolean
}

type BookSearchData = {
  documents: Book[]
  meta: SearchMetadata
}

const searchBook = async ({ query, page }: BookSearchParams) => {
  console.log('search', query)
  return axios({
    method: 'GET',
    url: BOOK_API_URL,
    params: { query, page },
    headers: {
      Authorization: `KakaoAK ${KAKAO_API}`,
    },
  }).then<BookSearchData>((res) => res.data)
}

const BOOK_API_URL = 'https://dapi.kakao.com/v3/search/book'

export const useBookSearch = ({ query, page = 1 }: BookSearchParams) => {
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState<Book[]>([])
  const [error, setError] = useState('')
  const [hasMore, setHasMore] = useState(false)
  const prevQuery = useRef(query)

  console.log('useBookSearch page', page)

  const search = useCallback(
    debounce(
      ({ query, page }: BookSearchParams) => {
        searchBook({ query, page })
          .then((data) => {
            console.log('검색 완료', query)
            console.log(data.documents)
            if (query !== prevQuery.current) {
              // 새 검색인 경우
              setBooks(data.documents)
            } else {
              // 페이지 숫자만 바뀐 경우
              setBooks((prevBooks) => [...prevBooks, ...data.documents])
            }

            console.log('data.meta.is_end', data.meta.is_end)
            setHasMore(!data.meta.is_end)
          })
          .catch((e) => {
            if (axios.isCancel(e)) return

            setError(e.message)
          })
          .finally(() => {
            setLoading(false)
            prevQuery.current = query
          })
      },
      500,
      { trailing: true }
    ),
    []
  )

  const reset = () => {
    setLoading(false)
    setError('')
    setBooks([])
    setHasMore(false)
    prevQuery.current = ''
  }

  useEffect(() => {
    if (!query) return reset()

    setLoading(true)
    setError('')
    search({ query, page })
  }, [query, page, search])

  return { loading, error, books, hasMore }
}
