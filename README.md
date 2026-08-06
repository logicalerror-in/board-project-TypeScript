# Board Project

React, TypeScript, NestJS, Prisma, and SQLite를 사용해 만드는 풀스택 게시판 프로젝트입니다.

이 프로젝트의 목표는 단순한 CRUD 구현이 아니라, 프론트엔드와 백엔드가 HTTP/API 계약을 기준으로 연결되는 흐름을 직접 구현하며 이해하는 것입니다.

## Tech Stack

- Node 24
- pnpm
- React
- TypeScript
- Vite
- Tailwind CSS
- NestJS
- Prisma
- SQLite

## Project Structure

```txt
.
├── api
│   ├── prisma
│   └── src
├── web
│   └── src
├── .mise.toml
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## Responsibilities
- web: React 기반 브라우저 UI
- api: NestJS 기반 HTTP API 서버
- api/prisma: Prisma schema와 migration 관리
- pnpm-workspace.yaml: web/api workspace 구성
- .mise.toml: Node 24 고정
- package.json: 루트 실행 스크립트와 프로젝트 메타 정보

## Current Flow
- 현재 게시판의 기본 흐름은 다음과 같습니다.

```txt
React web
→ fetch("/api/posts")
→ Vite dev proxy
→ NestJS Controller
→ NestJS Service
→ PrismaService
→ SQLite
→ HTTP JSON response
→ React state
→ render
```
프론트엔드와 백엔드는 함수 호출로 직접 연결되지 않습니다.

프론트엔드는 HTTP request를 보내고, 백엔드는 HTTP response를 반환합니다.


## Completed MVP Scope

현재까지 확인한 범위는 다음과 같습니다.

- 루트 pnpm workspace 구성
- Node 24 + mise 기준 설정
- React + Vite + TypeScript + Tailwind web 앱 구성
- NestJS api 앱 구성
- Vite proxy를 통한 /api 요청 전달
- Prisma + SQLite 설정
- Post model 정의
- Posts API 기본 CRUD 구현
- web에서 게시글 목록 조회
- web에서 게시글 상세 조회
- web에서 게시글 생성


## API Endpoints

현재 구현된 주요 API는 다음과 같습니다.

```txt
GET    /api/health
GET    /api/posts
GET    /api/posts/:postId
POST   /api/posts
PATCH  /api/posts/:postId
DELETE /api/posts/:postId
```

현재 web 화면에서는 목록, 상세, 생성 기능을 우선 연결했습니다.

수정과 삭제는 API는 존재하지만, web UI 연결은 다음 개선 단계에서 진행합니다.


## Intentional Simplifications

현재 구조에는 의도적으로 남겨둔 단순화가 있습니다.

- App.tsx가 아직 많은 책임을 가지고 있음
- API 호출 코드가 component 안에 있음
- API response를 as Post / as Post[]로 단순 단언함
- 공통 API client layer가 없음
- custom hook이 없음
- React Router가 없음
- 게시글 수정/삭제 UI가 아직 없음
- 댓글 기능이 아직 없음
- 세션 로그인과 Redux auth 상태가 아직 없음
- 공통 error response 형식이 아직 없음
- NestJS GlobalExceptionFilter가 아직 없음

이 단순화는 임시입니다.

먼저 작동하는 흐름을 확인한 뒤, 다음 단계에서 API 계약, 타입, 상태 관리, error handling, route, hook, 계층 분리를 점진적으로 정리합니다.


## Next Improvement Scope

다음 개선 단계에서는 다음 내용을 다룹니다.

- Posts API contract 정리
- request/response type 분리
- web API client layer 생성
- 204 No Content 처리
- 게시글 수정 UI 연결
- 게시글 삭제 UI 연결
- component 분리
- custom hook 분리
- React Router 도입
- form validation 정리
- API error 처리 개선


## Development

Node 버전을 확인합니다.
```txt
node -v
```

pnpm 버전을 확인합니다.
```txt
pnpm -v
```

루트 환경을 확인합니다.
```txt
pnpm check:env
```

API 서버를 실행합니다.
```txt
pnpm dev:api
```

web 앱을 실행합니다.
```txt
pnpm dev:web
```

브라우저에서 다음 주소에 접속합니다.
```txt
http://localhost:5173
```


## Notes

TypeScript 타입은 런타임에 사라집니다.

따라서 React request/response type, NestJS DTO, Prisma model, API contract는 서로 연결되어 있지만 같은 책임을 가지지 않습니다.

- React type: 프론트 컴파일 타임 타입
- NestJS DTO: HTTP request 구조와 validation 대상
- Prisma model: DB schema와 DB 접근 기준
- API contract: 프론트와 백엔드가 HTTP로 주고받기로 한 약속

현재는 작동 흐름을 먼저 확인하기 위해 일부 타입 검증을 단순화했습니다.

API response 검증, unknown, type guard, 공통 error response는 다음 개선 단계에서 정리합니다.


## 라우트 기준 데이터 조회 책임

현재 프론트엔드는 `App.tsx`에서 `usePosts()`를 한 번 호출하고, 그 결과를 각 page component에 전달한다.

이 구조는 Phase 14 학습을 위한 중간 구조다.

### 현재 구조

- `/posts`
    - 게시글 목록 화면
    - `postListState`를 사용한다.
    - 새로고침 시 `loadPosts()`를 호출한다.

- `/posts/:postId`
    - 게시글 상세 화면
    - URL parameter의 `postId`를 number로 변환/검증한다.
    - 유효한 postId이면 `fetchPostDetail(postId)`를 호출한다.

- `/posts/:postId/edit`
    - 게시글 수정/삭제 화면
    - URL parameter의 `postId`를 number로 변환/검증한다.
    - 유효한 postId이면 `fetchPostDetail(postId)`를 호출해 수정 대상 데이터를 불러온다.

### create/update/delete 이후 상태 갱신 기준

현재 Phase 14에서는 생성/수정/삭제 성공 후 서버 응답을 이용해 React state를 직접 갱신한다.

- create 성공
    - 생성된 게시글을 목록 state에 추가한다.
    - 생성된 게시글을 상세 state로 설정한다.

- update 성공
    - 수정된 게시글을 상세 state로 설정한다.
    - 목록 state에서 같은 id의 게시글을 교체한다.

- delete 성공
    - 목록 state에서 삭제된 게시글을 제거한다.
    - 상세 state를 idle로 되돌린다.

이 방식은 React state 변경과 렌더링 흐름을 학습하기 위한 방식이다.

실무에서는 다중 사용자 변경, 서버 정렬, pagination, filter, search가 있는 경우 mutation 이후 목록/상세 데이터를 다시 fetch하는 방식이 더 안전할 수 있다.

### TanStack Query 도입 여부

Phase 14에서는 TanStack Query를 도입하지 않는다.

이유는 다음과 같다.

- 직접 `fetch` 흐름을 이해한다.
- `response.ok`, `response.json()`, `unknown`, type guard를 직접 다룬다.
- loading/error/success 상태를 직접 관리한다.
- custom hook이 어떤 문제를 해결하는지 직접 경험한다.
- 서버 상태 관리가 왜 어려운지 이해한 뒤, 필요할 때 별도 학습 주제로 다룬다.

따라서 Phase 14의 서버 데이터 관리는 다음 구조를 유지한다.

```txt
page/component
→ usePosts custom hook
→ postsApi.ts
→ fetch
→ NestJS API
```

