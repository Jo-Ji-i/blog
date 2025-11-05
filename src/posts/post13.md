---
title: 'Next.js의 Data Fetching 패턴'
date: '2025-03-09'
excerpt: 'SSR, SSG, ISR, CSR 렌더링 방식에 대해 알아보자..'
tags: ['Next', '렌더링']
image: 'next.png'
category: 'next'
---

기존 Next.js 에는 `getServerSideProps`, `getStaticProps`, `useEffect` 이런 것들이 막 섞여 있어서

“이게 지금 어디서 실행되는 거지?” 싶은 순간이 꼭 온다.

사실 Next.js의 데이터 패칭 패턴은 **렌더링 시점**이랑 **데이터 준비 타이밍**으로 구분하면 훨씬 깔끔하게 이해된다.

---

## 1. SSR (Server-Side Rendering)

**Server-Side Rendering**은 말 그대로 **요청이 들어올 때마다 서버에서 HTML을 만들어서 보내주는 방식**이다.

즉, 페이지를 요청할 때마다 서버가 데이터(fetch)를 가져와서 HTML을 그린다.

-   **사용 시점**: 항상 최신 데이터를 보여줘야 하는 페이지 (예: 마이페이지, 실시간 데이터 등)
-   **특징**:
    -   SEO에 강함 (서버에서 이미 HTML이 완성되어 있음)
    -   요청마다 렌더링하므로 서버 부하가 있음
-   **Next.js에서의 구현**:
    ```jsx
    export async function getServerSideProps() {
        const res = await fetch('https://api.example.com/data');
        const data = await res.json();
        return { props: { data } };
    }
    ```
    이 함수는 서버에서만 실행된다. 클라이언트에서는 절대 호출되지 않는다.

---

## 2. SSG (Static Site Generation)

**Static Site Generation**은 **빌드 시점에 HTML을 미리 만들어두는 방식**이다.

즉, 페이지가 빌드될 때 fetch가 실행되고, 그 결과로 정적 HTML 파일이 생성된다.

-   **사용 시점**: 자주 안 바뀌는 콘텐츠 (예: 블로그 글, 공지사항 등)
-   **특징**:
    -   페이지 로딩이 매우 빠름 (이미 만들어진 HTML을 바로 응답)
    -   데이터가 변하려면 다시 빌드해야 함
-   **Next.js에서의 구현**:
    ```jsx
    export async function getStaticProps() {
        const res = await fetch('https://api.example.com/posts');
        const posts = await res.json();
        return { props: { posts } };
    }
    ```

---

## 3. ISR (Incremental Static Regeneration)

**ISR**은 **SSG의 단점을 보완한 방식**이다.

기존에 빌드된 페이지를 그대로 쓰되, 일정 주기마다 **백그라운드에서 페이지를 새로 생성**한다.

-   **사용 시점**: 거의 정적인 데이터지만 가끔 업데이트되는 경우 (예: 뉴스 리스트, 상품 목록 등)
-   **특징**:
    -   빌드 속도 빠름
    -   자동으로 최신 데이터 반영
-   **Next.js에서의 구현**:
    ```jsx
    export async function getStaticProps() {
        const res = await fetch('https://api.example.com/products');
        const products = await res.json();
        return {
            props: { products },
            revalidate: 60, // 60초마다 재생성
        };
    }
    ```

---

## 4. CSR (Client-Side Rendering)

**Client-Side Rendering**은 **페이지 로드 후 브라우저에서 데이터 요청을 보내고 렌더링하는 방식**이다.

이건 React 기본 방식이기도 하다.

-   **사용 시점**: 로그인 후 개인화된 데이터, 서버 부하를 줄이고 싶은 경우
-   **특징**:
    -   SEO에 약함 (초기 HTML이 비어 있음)
    -   사용자 인터랙션 중심 페이지에 적합
-   **Next.js에서의 구현**:
    ```jsx
    import { useEffect, useState } from 'react';

    export default function Page() {
        const [data, setData] = useState(null);

        useEffect(() => {
            fetch('/api/data')
                .then((res) => res.json())
                .then((json) => setData(json));
        }, []);

        return <div>{data ? data.title : 'Loading...'}</div>;
    }
    ```

---

## 5. 어떤 걸 써야 할까?

| 패턴    | 렌더링 시점          | 장점             | 단점                          | 추천 상황                    |
| ------- | -------------------- | ---------------- | ----------------------------- | ---------------------------- |
| **SSR** | 요청 시              | 항상 최신 데이터 | 느림, 서버 부하               | 실시간 데이터, 유저별 페이지 |
| **SSG** | 빌드 시              | 빠름, SEO 좋음   | 데이터 갱신 어려움            | 블로그, 공지사항             |
| **ISR** | 빌드 + 주기적 재생성 | 최신 유지 + 빠름 | 일정 주기 내 데이터 지연 가능 | 상품목록, 뉴스피드           |
| **CSR** | 클라이언트           | 서버 부담 적음   | SEO 약함                      | 개인화 페이지, 내부 서비스   |

---

## 6. 마무리

Next.js는 단순히 SSR 프레임워크가 아니다.

**페이지 특성에 따라 렌더링 방식을 조합할 수 있는 하이브리드 프레임워크**다.

예를 들어,

-   홈은 SSG
-   상품 리스트는 ISR
-   마이페이지는 SSR
-   대시보드 내부 데이터는 CSR

이렇게 섞어 쓰는 게 진짜 Next.js를 제대로 쓰는 방법이다.
