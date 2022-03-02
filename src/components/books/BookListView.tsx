import React from 'react'
import styled from '@emotion/styled'
import { Book } from '../../hooks/useBookSearch'
import { BookCard } from './BookCard'

const BookListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
interface BookListViewProps {
  books: Book[]
  onBookClick?: (b: Book) => void
}

export const BookListView: React.FC<BookListViewProps> = ({
  books,
  onBookClick,
}) => {
  return (
    <BookListContainer>
      {books.map((book, index) => (
        <BookCard key={book.isbn + index} book={book} onClick={onBookClick} />
      ))}
    </BookListContainer>
  )
}
