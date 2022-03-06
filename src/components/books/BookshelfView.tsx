import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { IconButton } from '@mui/material'
import React from 'react'
import type {
  Book,
  Bookshelf,
} from '../../store/modules/bookshelf/bookshelfAPI'
import { BookCard } from './BookCard'
import styled from '@emotion/styled'

const BookshelfContinaer = styled.div`
  display: flex;
  flex-direction: column;
`

const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const DeleteButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

interface BookshelfViewProps {
  bookshelf: Bookshelf
  onBookClick?: (b: Book) => void
  onDeleteBook?: (isbn: string) => void
}

export const BookshelfView: React.FC<BookshelfViewProps> = ({
  bookshelf,
  onBookClick,
  onDeleteBook,
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
              <div key={book.isbn + index} style={{ position: 'relative' }}>
                <BookCard book={book} onClick={onBookClick} />

                <DeleteButton>
                  <IconButton onClick={() => onDeleteBook?.(book.isbn)}>
                    <HighlightOffIcon />
                  </IconButton>
                </DeleteButton>
              </div>
            ))}
          </BooksContainer>
        )}
      </div>
    </BookshelfContinaer>
  )
}
