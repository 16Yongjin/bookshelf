# 온라인 책장 서비스 (개발중)

![KakaoTalk_20220306_230026971](https://user-images.githubusercontent.com/22253556/157056306-3bd973fb-eca6-4a99-a2c5-4e58ca7afaf8.png)

## 기술 스택

- Next.js
- Redux ToolKit
- MUI
- Emotion

## 기능

- 도서 검색 with 카카오 책 API
- 깃헙 OAuth 로그인
- 도서 목록 Gist 저장
- 임베드용 책장 페이지

## 개발 범위

### `/embed/:username/:id`

- 해당 GIST에 저장된 책 목록 가져오기

### `/books/my`

- 현재 로그인 되어있는 깃헙 계정의 책 목록 보여주기
- 책장 추가 기능 (사이드바 or 모달)

  - 책 목록 인피니티 스크롤
  - 책 선택 후 책 목록에 추가됨
  - 저장 버튼 눌러에 Gist에 저장됨
  - 자동 저장 5초 쓰로틀
  - 저장 안 된 상태에서 페이지 못나가게 beforeunload 설정

- 책장 삭제 기능
- 책장 못 찾으면
  - 책 목록 추가 버튼
  - GIST 탐색 모달

### `/login`

- 깃헙 로그인 페이지
