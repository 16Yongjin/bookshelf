import { Grid, Button, IconButton, CircularProgress } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached'
import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { setAccessToken, setUsername } from '../../store/modules/auth/authSlice'
import {
  addBook,
  createBookshelfAsync,
  deleteBookshelfAsync,
  fetchBookshelfAsync,
  removeBook,
  saveBookshelfAsync,
  selectBookshelf,
  selectBookshelfStatus,
} from '../../store/modules/bookshelf/bookshelfSlice'
import { BookshelfView } from '../../components/books/BookshelfView'
import { AddBook } from '../../components/books/AddBook'
import { Book } from '../../hooks/useBookSearch'
import ReplyIcon from '@mui/icons-material/Reply'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import { ShareUrlModal } from '../../components/modal/ShareUrl'
import Link from 'next/link'

const MyBooks: NextPage = () => {
  const { data: session } = useSession()
  const bookshelf = useAppSelector(selectBookshelf)
  const status = useAppSelector(selectBookshelfStatus)
  const dispatch = useAppDispatch()

  const createBookshelf = () => dispatch(createBookshelfAsync())
  const deleteBookshelf = (id: string) => () =>
    dispatch(deleteBookshelfAsync(id))
  const fetchBookshelf = () => dispatch(fetchBookshelfAsync())
  const addABook = (book: Book) => dispatch(addBook(book))
  const deleteBook = (isbn: string) => dispatch(removeBook(isbn))
  const saveBookshelf = () => dispatch(saveBookshelfAsync())
  const onBookClick = (book: Book) => {
    console.log(book)
    if (!bookshelf) return
    deleteBook(book.isbn)
    addABook(book)
  }
  const embedURL = `/embed/${bookshelf?.username}/${bookshelf?.id}`

  // 첫 로딩 시 책장 불러오기
  useEffect(() => {
    if (!session?.accessToken) return
    const { accessToken, user } = session
    if (!accessToken || !user) return
    if (bookshelf) return

    dispatch(setAccessToken(accessToken as string))
    dispatch(setUsername(user.name as string))
    dispatch(fetchBookshelfAsync())
  }, [session])

  if (!session?.user)
    return <button onClick={() => signIn('github')}>Sign in with Github</button>

  return (
    <div>
      <h1>Github OAuth Demo</h1>
      <p>
        Not {session.user.name || session.user.email}? Then Logout and login
        again
      </p>
      <button onClick={() => signOut()}>Logout</button> <br />
      <div>status: {status}</div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <AddBook onBookClick={onBookClick} />
        </Grid>
        <Grid item xs={6}>
          {status === 'none' && (
            <div>
              책장이 없습니다.
              <Button variant="contained" onClick={createBookshelf}>
                책장 추가
              </Button>
            </div>
          )}

          {bookshelf && (
            <Button
              variant="outlined"
              color="error"
              onClick={deleteBookshelf(bookshelf.id)}
            >
              책장 삭제
            </Button>
          )}

          {bookshelf && (
            <Button
              variant="outlined"
              color="info"
              disabled={status !== 'draft'}
              onClick={saveBookshelf}
            >
              {status === 'saving' && (
                <CircularProgress size="1rem" sx={{ mr: 1 }} />
              )}
              <span>책장 저장</span>
            </Button>
          )}

          <IconButton onClick={fetchBookshelf}>
            <CachedIcon />
          </IconButton>

          {bookshelf && (
            <Link href={embedURL} passHref>
              <a target="_blank" rel="noopener noreferrer">
                <IconButton>
                  <LibraryBooksIcon />
                </IconButton>
              </a>
            </Link>
          )}

          {bookshelf && (
            <ShareUrlModal
              activator={
                <IconButton>
                  <ReplyIcon style={{ transform: 'scaleX(-1)' }} />
                </IconButton>
              }
              url={embedURL}
            />
          )}

          {bookshelf && (
            <BookshelfView bookshelf={bookshelf} onDeleteBook={deleteBook} />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default MyBooks
