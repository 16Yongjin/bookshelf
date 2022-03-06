/* eslint-disable @next/next/no-img-element */
import React from 'react'
import type { Bookshelf } from '../../store/modules/bookshelf/bookshelfAPI'
import styled from '@emotion/styled'
import { EmbedBookCover } from './BookCover'

const BookshelfContinaer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f3ef;
  min-height: 100vh;
`

const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem 2rem;

  background-image: url('/shelf.svg');
  background-repeat: repeat-y;
  background-size: 100% calc(174px + 3rem);
  padding-bottom: 1rem;

  max-width: 1024px;
  margin: 0 auto;
`

interface EmbedBookshelfViewProps {
  bookshelf: Bookshelf
}

export const EmbedBookshelfView: React.FC<EmbedBookshelfViewProps> = ({
  bookshelf,
}) => {
  return (
    <BookshelfContinaer>
      <h2>{bookshelf.name}</h2>
      <div>
        {!bookshelf.books.length ? (
          <div>책장에 비었어요.</div>
        ) : (
          <BooksContainer>
            {bookshelf.books.map((book, index) => (
              <EmbedBookCover key={book.isbn + index} book={book} />
            ))}
          </BooksContainer>
        )}
      </div>
    </BookshelfContinaer>
  )
}
