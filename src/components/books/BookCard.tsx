import React from 'react'
import type { Book } from '../../hooks/useBookSearch'
import styled from '@emotion/styled'

interface BookCardProps {
  book: Book
  onClick?: (b: Book) => void
}

const BookCardDiv = styled.div`
  cursor: click;
  width: 120px;
`

export const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <BookCardDiv onClick={() => onClick?.(book)}>
      <div>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img src={book.thumbnail} alt={book.title} />
      </div>
      <div>{book.title}</div>

      <div>
        {book.authors.join(', ')} / {book.publisher}
      </div>
    </BookCardDiv>
  )
}
