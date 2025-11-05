---
title: '이미지 최적화 전략'
date: '2025-02-10'
excerpt: '프론트엔드 성능 최적화 얘기할 때, **이미지 최적화**는 진짜 빠질 수 없는 주제다....'
tags: ['Next.js', 'image']
category: 'frontend'
image: 'fe.png'
---

웹페이지 로딩 속도의 대부분을 차지하는 게 사실상 이미지 파일이기 때문에, 이걸 잘 다루는 게 곧 **사용자 경험(UX)**을 결정한다.

오늘은 대표적인 세 가지 이미지 최적화 전략을 정리해본다 —

**WebP**, **lazy loading**, **responsive image**.

---

## 1️⃣ WebP — 더 가볍고 선명한 이미지 포맷

예전엔 대부분 `JPEG`나 `PNG`를 썼는데, 요즘은 거의 **WebP**로 넘어가는 추세다.

### WebP가 좋은 이유

-   **용량이 작다.**
    JPEG 대비 25~35% 정도 더 가볍다.
    (투명도까지 지원하니까 PNG 대체도 가능)
-   **품질 저하가 거의 없다.**
    압축률이 높아도 시각적인 손실이 잘 느껴지지 않는다.
-   **모던 브라우저 대부분 지원**
    이제 Safari 포함 거의 모든 브라우저에서 지원된다.

### 실제 적용 방법

Next.js 기준으로는 그냥 `next/image` 컴포넌트를 쓰면 된다.

빌드 시 자동으로 WebP 등으로 변환해준다.

```tsx
import Image from "next/image";

export default function Example() {
  return (
    <Imagesrc="/images/profile.png"
      alt="프로필 이미지"
      width={300}
      height={300}
      quality={80}
    />
  );
}

```

Next.js가 내부적으로 이미지를 최적화하고, 브라우저가 WebP를 지원하면 그 포맷으로 자동 서빙한다.

---

## 2️⃣ Lazy Loading — 필요할 때만 로드하기

이미지가 많을수록 로딩 속도는 느려진다.

그런데 모든 이미지를 처음부터 로드할 필요는 없다.

**사용자가 스크롤해서 볼 때만 로드하는 방식**이 바로 **lazy loading**이다.

### HTML 기본 방식

```html
<img src="thumbnail.jpg" loading="lazy" alt="썸네일" />
```

`loading="lazy"` 속성만 넣으면 끝이다.

요즘 브라우저는 기본적으로 이 속성을 지원한다.

### React 환경에서

React에서도 그냥 `<img loading="lazy" />` 써도 된다.

근데 보통 IntersectionObserver를 활용해서 커스텀 구현하기도 한다.

```tsx
const LazyImage = ({ src, alt }) => {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && imgRef.current) {
                imgRef.current.src = src;
                observer.disconnect();
            }
        });
        if (imgRef.current) observer.observe(imgRef.current);
    }, [src]);

    return <img ref={imgRef} alt={alt} loading="lazy" />;
};
```

이런 식으로 스크롤 감지해서 필요한 시점에만 이미지 로드.

---

## 3️⃣ Responsive Image — 기기별로 최적화된 해상도 제공

모바일에서 데스크톱용 고화질 이미지를 불러오면 낭비가 심하다.

그래서 **기기 해상도에 따라 다른 이미지를 서빙**해야 한다.

### HTML 방식 (`srcset` + `sizes`)

```html
<imgsrc
    ="photo-800.jpg"
    srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
    sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
    alt="풍경"
/>
```

이렇게 하면 브라우저가 스스로 디바이스 크기에 맞는 이미지를 선택해서 불러온다.

### Next.js에서는?

`<Image />` 컴포넌트가 자동으로 responsive behavior를 지원한다.

`fill` 속성이나 `sizes` 속성으로 유연하게 대응할 수 있다.

```tsx
<Image
    src="/images/landscape.jpg"
    alt="배경 이미지"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
/>
```

Next.js가 자동으로 크롭된 버전, 다른 해상도 버전을 만들어준다.

---

## 💡 정리하자면

| 전략             | 목적                   | 주요 포인트                     |
| ---------------- | ---------------------- | ------------------------------- |
| WebP             | 파일 용량 줄이기       | JPEG/PNG보다 25~35% 가벼움      |
| Lazy Loading     | 렌더링 최적화          | 필요한 시점에만 이미지 로드     |
| Responsive Image | 디바이스별 해상도 대응 | `srcset`, `sizes`, `next/image` |

이미지 최적화는 단순히 “속도 개선”이 아니라,

사용자 경험과 SEO(검색 노출)까지 모두 영향을 준다.

빌드 환경이 Next.js라면 위의 세 가지는 거의 자동화되어 있지만,

기본 원리를 알고 직접 제어할 수 있는 게 진짜 프론트엔드 실력이라고 생각한다.
