import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { EmbedBookshelfView } from '../../components/embed/Bookshelf'
import { Bookshelf } from '../../store/modules/bookshelf/bookshelfAPI'
import BookshelfSample from './sample.json'

type BookshelfEmbedProps = {
  bookshelf: Bookshelf
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [username, bookshelfId] = context.query.embed as string[]
  if (!username || !bookshelfId) return { notFound: true }

  const bookshelfURL = `https://gist.githubusercontent.com/${username}/${bookshelfId}/raw/`

  // const bookshelf = await axios
  //   .get(bookshelfURL)
  //   .then((res) => res.data)
  //   .catch(() => null)

  // if (!bookshelf) return { notFound: true }

  // console.log(bookshelfURL, bookshelf)

  return {
    props: { bookshelf: BookshelfSample }, // will be passed to the page component as props
  }
}

const BookshelfEmbed: NextPage<BookshelfEmbedProps> = ({ bookshelf }) => {
  return <div>{bookshelf && <EmbedBookshelfView bookshelf={bookshelf} />}</div>
}

export default BookshelfEmbed
