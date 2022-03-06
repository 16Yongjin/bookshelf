import React from 'react'
import type { Book } from '../../hooks/useBookSearch'
import styled from '@emotion/styled'

interface EmbedBookCardProps {
  book: Book
  onClick?: (b: Book) => void
}

const EmbedBookCardDiv = styled.div`
  cursor: click;
  width: 120px;
`

export const EmbedBookCard: React.FC<EmbedBookCardProps> = ({
  book,
  onClick,
}) => {
  return (
    <EmbedBookCardDiv onClick={() => onClick?.(book)}>
      <div>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img src={book.thumbnail} alt={book.title} />
      </div>
      <div>{book.title}</div>

      <div>
        {book.authors.join(', ')} / {book.publisher}
      </div>
    </EmbedBookCardDiv>
  )
}
