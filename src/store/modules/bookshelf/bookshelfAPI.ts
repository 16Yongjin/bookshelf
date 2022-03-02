import { Octokit } from '@octokit/core'
import axios from 'axios'
import type { Book } from '../../../hooks/useBookSearch'
export type { Book } from '../../../hooks/useBookSearch'

const FILE_NAME = 'my-bookshelf.json'

export type Bookshelf = {
  id: string
  name: string
  books: Book[]
}

type BookshelfAPIParams = { accessToken: string }
type AddBook = { book: Book }
type UpdateBookshelf = { bookshelf: Bookshelf }
type DeleteBookshelf = { id: string }
type CreateBookshelf = { username: string }

export class BookshelfAPI {
  accessToken: string
  octokit: Octokit

  constructor({ accessToken }: BookshelfAPIParams) {
    this.accessToken = accessToken
    this.octokit = new Octokit({ auth: accessToken })
  }

  /** 책장 가져오기 */
  async fetch() {
    const gist = await this.findGist()
    const dataUrl = gist.files[FILE_NAME].raw_url!
    const bookshelf = await axios
      .get(dataUrl)
      .then<Bookshelf>((res) => res.data)
    bookshelf.id = gist.id
    console.log(bookshelf)
    return bookshelf
  }

  /** 책 추가하기 */
  async addBook({ book }: AddBook) {
    const bookshelf = await this.fetch()
    const books = [...bookshelf.books, book]
    const newBookshelf = { ...bookshelf, books }
    await this.update({ bookshelf: newBookshelf })
    return newBookshelf
  }

  /** 책장 만들기 */
  async create({ username }: CreateBookshelf) {
    const bookshelf: Bookshelf = {
      id: '',
      name: `${username}의 책장`,
      books: [],
    }
    const result = await this.octokit.request(`POST /gists`, {
      public: true,
      files: {
        [FILE_NAME]: {
          content: JSON.stringify(bookshelf),
        },
      },
    })
    bookshelf.id = result.data.id! // 아이디 설정

    await this.update({ bookshelf })
  }

  /** 지스트 찾기 */
  private async findGist() {
    const gists = await this.octokit.request('GET /gists')
    const gist = gists.data.find((gist) => gist.files[FILE_NAME])
    if (!gist) throw new Error('Gist에서 책장을 찾지 못했습니다.')
    return gist
  }

  /** 지스트 업데이트 */
  async update({ bookshelf }: UpdateBookshelf) {
    return this.octokit.request(`PATCH /gists/${bookshelf.id}`, {
      files: {
        [FILE_NAME]: {
          content: JSON.stringify(bookshelf),
        },
      },
    })
  }

  /** 지스트 삭제 */
  async delete({ id }: DeleteBookshelf) {
    return this.octokit.request(`DELETE /gists/${id}`)
  }
}
