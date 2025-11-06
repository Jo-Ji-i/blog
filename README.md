# Next.js 개인 기술 블로그

## 프로젝트 소개

개인 학습 내용을 정리하고 개발자로서 역량 강화를 위해 제작한 개인 기술 블로그입니다. 단순 아카이빙을 넘어, SSR/CSR, 서버/클라이언트 컴포넌트 구조, 성능 최적화 등 실무 경험을 쌓기 위해 구현했습니다. Next.js App Router 기반으로 서버와 클라이언트 렌더링 방식을 적절히 선택하여 최적화했습니다.


### 메인페이지
<img width="1440" height="737" alt="스크린샷 2025-11-06 오후 9 36 54" src="https://github.com/user-attachments/assets/706c979c-a2e2-4e6d-9d71-904b889d44c1" />


### 게시물 페이지
<img width="917" height="667" alt="스크린샷 2025-11-06 오후 9 38 04" src="https://github.com/user-attachments/assets/ba69f680-07f2-4629-8726-20d44f8d0557" />



## 주요 기능

-   **게시물 목록 페이지**

    -   서버 컴포넌트에서 Markdown 포스트 데이터를 패칭하여 초기 HTML 렌더링
    -   재사용 가능한 게시글 카드 컴포넌트 설계
    -   태그 필터링 및 정렬 기능 (`map`, `filter`, `sort` 활용)

-   **게시물 상세 페이지**

    -   `[slug]` 기반 동적 라우팅 적용
    -   ReactMarkdown + rehype-highlight를 사용한 Markdown 콘텐츠 렌더링
    -   목차(TOC) 사이드바 구현 → 동적 링크 생성

-   **다크/라이트 모드**

    -   `next-themes` 활용, 클라이언트 사이드 테마 전환
    -   Hydration Mismatch 방지: 클라이언트 마운트 후 UI 렌더링

-   **배포**
    -   Vercel 서버리스 환경에 배포
    -   Next.js App Router와 RSC 구조 유지하며 빌드 및 초기 렌더링 최적화

## 기술 스택

-   **Frontend:** Next.js 15 (App Router, Server/Client Component)
-   **Styling:** Tailwind CSS, 다크 모드, 반응형 디자인
-   **Markdown 렌더링:** ReactMarkdown, rehype-highlight
-   **배포:** Vercel
-   **상태 관리:** useState, useEffect (필요 최소한의 클라이언트 상태)

## 회고

이번 프로젝트를 통해 Next.js App Router 구조와 SSR/CSR 차이를 직접 체험하며, 서버/클라이언트 상태 관리, 렌더링 최적화, Markdown 콘텐츠 처리 등 다양한 실무 경험을 쌓았습니다. Hydration Mismatch, params 비동기 처리 등 문제 해결 과정을 통해 문제 분석 능력과 공식 문서 활용 중요성을 체득했습니다.

## 보완할 점

-   **기능 확장:** 검색, 댓글, 즐겨찾기 등 사용자 참여 기능 추가
-   **UI/UX 개선:** 테마 전환 애니메이션, 반응형 디자인 고도화
-   **데이터 처리 최적화:** ISR 활용, 이미지/코드 렌더링 성능 개선, API 구조 최적화
-   **테스트 및 안정성:** 유닛/통합 테스트 강화

## Getting Started

```bash
npm i
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 디렉토리 구조

```
├─ public
│ ├─ favicon.ico
│ ├─ images
│ │ └─ main
│ │ ├─ post1-cover.png
│ │
│ └─ posts
├─ src
│ ├─ app
│ │ ├─ api
│ │ │ └─ posts
│ │ │ ├─ [slug]
│ │ │ │ └─ route.ts
│ │ │ └─ route.ts
│ │ ├─ article
│ │ │ ├─ [slug]
│ │ │ │ └─ page.tsx
│ │ │ ├─ layout.tsx
│ │ │ └─ page.tsx
│ │ ├─ category
│ │ │ ├─ [slug]
│ │ │ │ └─ page.tsx
│ │ │ ├─ layout.tsx
│ │ │ └─ page.tsx
│ │ ├─ globals.css
│ │ ├─ layout.tsx
│ │ └─ page.tsx
│ ├─ assets
│ │ └─ icons
│ │ ├─ moon.svg
│ │ └─ sun.svg
│ ├─ components
│ │ ├─ CategorySection.tsx
│ │ ├─ ContactSection.tsx
│ │ ├─ HeaderDefalut.tsx
│ │ ├─ Hero.tsx
│ │ ├─ HomeList.tsx
│ │ ├─ Intro.tsx
│ │ ├─ PostCard.tsx
│ │ ├─ PostList.tsx
│ │ ├─ PostRender.tsx
│ │ ├─ PostSection.tsx
│ │ ├─ PostSectionClient.tsx
│ │ ├─ ProjectPreview.tsx
│ │ ├─ TagField.tsx
│ │ ├─ Toc.tsx
│ │ ├─ buttons
│ │ │ ├─ Button.tsx
│ │ │ └─ ThemeButton.tsx
│ │ ├─ getHeadingToc.tsx
│ │ └─ providers
│ │ └─ ThemeProvider.tsx
│ ├─ fonts
│ │ └─ PretendardVariable.ttf
│ ├─ lib
│ │ ├─ api.ts
│ │ ├─ types.ts
│ │ └─ utils.ts
│ ├─ posts
│ │ ├─ post1.m
│ │ ├─ post10.md
│ │ ├─ post11.md
│ │ ├─ post12.md
│ ├─ stores
│ │ └─ tagStore.ts
│ ├─ style
│ │ ├─ icons.ts
│ │ └─ theme.ts
│ ├─ utils
│ └─ variables
│ └─ tags.ts
├─ tailwind.config.js
├─ tsconfig.json
└─ vercel.json

```



```

