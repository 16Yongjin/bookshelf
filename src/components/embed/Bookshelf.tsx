/* eslint-disable @next/next/no-img-element */
import React from 'react'
import type { Bookshelf } from '../../store/modules/bookshelf/bookshelfAPI'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

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

  /* background: url('shelf.svg'); */
  background-repeat: repeat-y;
  /* background-position: center; */
  background-size: 100% calc(174px + 3rem);
  padding-bottom: 1rem;

  max-width: 1024px;
  margin: 0 auto;
`

const BookCover = styled.div`
  position: relative;
  width: 120px;
  height: 174px;
  transform-style: preserve-3d;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 0.3s;
  box-shadow: 5px 5px 8px 0px rgba(151, 146, 153, 0.6);

  /* animation: rotate 5s linear infinite; */

  &:hover {
    transform: perspective(500px) rotate3d(0, 1, 0, 30deg);

    .book-fore-edge {
      transform: translate3d(-20px, 0, 0);
    }
  }
  /* 
  @keyframes rotate {
    0% {
      transform: rotate3d(0, 1, 0, 0deg);
    }

    100% {
      transform: rotate3d(0, 1, 0, 360deg);
    }
  } */
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
          <BooksContainer
            style={{
              backgroundImage: `url('data:image/svg+xml;utf-8,
                <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 15 172 H 190 L 190 140 H 10 Z" style="filter: drop-shadow(0px 15px 4px rgb(0 0 0 / 0.3));" width="90%" height="2rem" fill="rgb(230,221,207)"/>
                <path d="M 0 164 H 200 L 190 140 H 10 Z" fill="rgb(230, 221, 207)" />
                <rect width="100%" height="0.5rem" y="164px" stroke="rba(193, 193, 193)" fill="rgb(241, 238, 232)" />
                </svg>')`
                .replace(/\n/g, '')
                .replace(/\s\s/g, ''),
            }}
          >
            {bookshelf.books.map((book, index) => (
              <BookCover key={book.isbn + index}>
                <img
                  className="book-cover"
                  src={book.thumbnail}
                  loading="lazy"
                  alt={book.title}
                  css={css`
                    width: 120px;
                    height: 174px;
                  `}
                />

                <BookSpine>
                  <img
                    css={css`
                      width: 120px;
                      height: 174px;
                      filter: blur(1px);
                    `}
                    className="book-cover"
                    src={book.thumbnail}
                    loading="lazy"
                    alt={book.title}
                  />
                </BookSpine>

                <BookForeEdge className="book-fore-edge"></BookForeEdge>
              </BookCover>
            ))}
          </BooksContainer>
        )}
      </div>
    </BookshelfContinaer>
  )
}
