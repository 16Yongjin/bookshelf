import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '../..'
import { Book, Bookshelf, BookshelfAPI } from './bookshelfAPI'

export interface BookshelfState {
  bookshelf: Bookshelf | null
  status: 'none' | 'loading' | 'idle' | 'failed' | 'saving' | 'draft'
}

const initialState: BookshelfState = {
  bookshelf: null,
  status: 'none',
}

export const fetchBookshelfAsync = createAsyncThunk(
  'bookshelf/fetchBookshelfAsync',
  async (_, { getState }) => {
    const state = getState() as AppState
    const accessToken = state.auth.accessToken
    if (!accessToken) return console.error('no Access Token'), null
    const api = new BookshelfAPI({ accessToken })
    try {
      const bookshelf = await api.fetch()
      return bookshelf
    } catch (e: any) {
      return null
    }
  }
)

export const addBookAsync = createAsyncThunk(
  'bookshelf/addBookAsync',
  async (book: Book, { getState }) => {
    const state = getState() as AppState
    const accessToken = state.auth.accessToken
    const api = new BookshelfAPI({ accessToken })
    return api.addBook({ book })
  }
)

export const saveBookshelfAsync = createAsyncThunk(
  'bookshelf/saveBookshelfAsync',
  async (_, { getState }) => {
    const state = getState() as AppState
    const accessToken = state.auth.accessToken
    const bookshelf = state.bookshelf.bookshelf
    if (!bookshelf) return

    const api = new BookshelfAPI({ accessToken })
    await api.update({ bookshelf })
  }
)

export const createBookshelfAsync = createAsyncThunk(
  'bookshelf/createBookshelfAsync',
  async (_, { getState, dispatch }) => {
    const state = getState() as AppState
    const { accessToken, username } = state.auth
    if (!accessToken) return console.error('no Access Token ')

    const api = new BookshelfAPI({ accessToken })
    await api.create({ username })

    dispatch(fetchBookshelfAsync())
  }
)

export const deleteBookshelfAsync = createAsyncThunk(
  'bookshelf/deleteBookshelfAsync',
  async (id: string, { getState, dispatch }) => {
    const state = getState() as AppState
    const accessToken = state.auth.accessToken
    if (!accessToken) return console.error('no Access Token ')

    const api = new BookshelfAPI({ accessToken })
    await api.delete({ id })

    dispatch(resetBookshelf())
  }
)

export const bookshelfSlice = createSlice({
  name: 'bookshelf',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.bookshelf?.books.push(action.payload)
      state.status = 'draft'
    },
    removeBook: (state, action: PayloadAction<Book['isbn']>) => {
      if (!state.bookshelf) return
      state.bookshelf.books = state.bookshelf.books.filter(
        (book) => book.isbn !== action.payload
      )
      state.status = 'draft'
    },
    resetBookshelf: (state) => {
      state.bookshelf = null
      state.status = 'none'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookshelfAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBookshelfAsync.fulfilled, (state, action) => {
        state.bookshelf = action.payload
        state.status = state.bookshelf ? 'idle' : 'none'
      })
      .addCase(fetchBookshelfAsync.rejected, (state) => {
        console.log('rejected!')
        state.status = 'none'
      })
      .addCase(saveBookshelfAsync.pending, (state) => {
        state.status = 'saving'
      })
      .addCase(saveBookshelfAsync.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(addBookAsync.pending, (state) => {
        state.status = 'saving'
      })
      .addCase(addBookAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.bookshelf = action.payload
      })
  },
})

export const { addBook, removeBook, resetBookshelf } = bookshelfSlice.actions

export const selectBookshelf = (state: AppState) => state.bookshelf.bookshelf
export const selectBookshelfStatus = (state: AppState) => state.bookshelf.status

export default bookshelfSlice.reducer
