This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 개발 범위

### `/books/:id`

- 해당 GIST ID에 저장된 책 목록 가져오기

### `/books/my`

- 현재 로그인 되어있는 깃헙 계정의 책 목록 보여주기
- 책 목록 추가 기능 (사이드바 or 모달)

  - 책 목록 인피니티 스크롤
  - 책 선택 후 책 목록에 추가됨
  - 저장 버튼 눌러에 Gist에 저장됨
  - 자동 저장 5초 쓰로틀
  - 저장 안 된 상태에서 페이지 못나가게 beforeunload 설정

- 책 목록 삭제 기능
- 책 목록 못 찾으면
  - 책 목록 추가 버튼
  - GIST 탐색 모달

### `/login`

- 깃헙 로그인 페이지
