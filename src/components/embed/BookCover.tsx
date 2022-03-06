/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import type { Book } from '../../hooks/useBookSearch'

const BookCover = styled.div`
  position: relative;
  width: 120px;
  height: 174px;
  transform-style: preserve-3d;
  transition: transform 0.3s;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 5px 5px 8px 0px rgba(151, 146, 153, 0.6);

  cursor: pointer;

  &:hover {
    transform: perspective(500px) rotate3d(0, 1, 0, 30deg);

    .book-fore-edge {
      transform: translate3d(-20px, 0, 0);
    }
  }
`

const BookSpine = styled.div`
  position: absolute;
  top: 0px;
  left: -14px;
  transform: translate3d(7px, 0, -7px) rotate3d(0, 1, 0, -90deg);
  height: 174px;
  width: 14px;
  overflow: hidden;
  border-right: 1px solid #ddd;
`

const BookForeEdge = styled.div`
  z-index: -2;
  position: absolute;
  width: 10px;
  height: 174px;
  top: 0;
  right: -10px;
  border-top: 6px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 4px solid white;
  opacity: 0.75;
  transition: transform 0.3s;
`

const TextBookCover = styled.div`
  position: relative;
  width: 120px;
  height: 174px;
  padding: 0.5rem;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  gap: 0.5rem;
`

const BookTitle = styled.div`
  text-align: center;
  font-weight: bold;
  margin-bottom: 1px solid #ddd;

  -webkit-line-clamp: 4;
`

const BookAuthor = styled.div`
  text-align: center;
  font-size: 0.9rem;

  -webkit-line-clamp: 2;
`

const TextBookSpine = styled.div`
  height: 174px;
  width: 14px;
  background-color: white;
`

interface BookCoverProps {
  book: Book
}

export const EmbedBookCover: React.FC<BookCoverProps> = ({ book }) => {
  const [error, setError] = useState(!book.thumbnail || false)

  return (
    <BookCover>
      {error ? (
        <TextBookCover>
          <BookTitle className="text-clamp">{book.title}</BookTitle>

          <BookAuthor className="text-clamp">
            {book.authors.join(', ')}
          </BookAuthor>
        </TextBookCover>
      ) : (
        <img
          src={book.thumbnail}
          alt={book.title}
          css={css`
            width: 120px;
            height: 174px;
          `}
          onError={() => setError(true)}
          loading="lazy"
        />
      )}

      <BookSpine>
        {error ? (
          <TextBookSpine />
        ) : (
          <img
            css={css`
              width: 120px;
              height: 174px;
              filter: blur(1px);
            `}
            src={book.thumbnail}
            alt={book.title}
            loading="lazy"
          />
        )}
      </BookSpine>

      <BookForeEdge className="book-fore-edge"></BookForeEdge>
    </BookCover>
  )
}
