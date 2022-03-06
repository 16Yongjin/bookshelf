/* eslint-disable @next/next/no-img-element */
import React from 'react'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import styled from '@emotion/styled'
import { EmbedBookCover } from './BookCover'
import type { Bookshelf } from '../../store/modules/bookshelf/bookshelfAPI'
import { IconButton } from '@mui/material'

const BookshelfContinaer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f3ef;
  min-height: 100vh;

  padding: 2rem;
`

const BookshelfHeader = styled.header`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BookshelfTitle = styled.h1`
  color: #2d1c15;
  letter-spacing: 0.16rem;

  margin: 0;
`

const BookshelfAction = styled.div`
  margin-right: 2rem;
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
      <BookshelfHeader>
        <BookshelfTitle>{bookshelf.name}</BookshelfTitle>
        <BookshelfAction>
          <IconButton sx={{ backgroundColor: '#D9AA6A' }}>
            <InsertLinkIcon />
          </IconButton>
        </BookshelfAction>
      </BookshelfHeader>
      <div>
        {!bookshelf.books.length ? (
          <div>책장에 비었어요.</div>
        ) : (
          <BooksContainer>
            {bookshelf.books.map((book, index) => (
              <a
                href={book.url}
                key={book.isbn + index}
                target="_blank"
                rel="noreferrer"
              >
                <EmbedBookCover book={book} />
              </a>
            ))}
          </BooksContainer>
        )}
      </div>
    </BookshelfContinaer>
  )
}
