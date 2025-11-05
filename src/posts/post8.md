---
title: 'Flexbox와 Grid 완전 정리 '
date: '2025-03-07'
excerpt: 'Flexbox와 Grid 차이와 사용패턴에 대해.'
tags: ['css']
image: 'css.png'
category: 'CSS'
---

CSS로 레이아웃을 짤 때 Flexbox랑 Grid는 거의 필수다.

둘 다 배치 도구이긴 하지만, **쓰는 목적과 사고방식이 다르다.**

Flexbox는 “한 줄” 중심, Grid는 “2차원 레이아웃” 중심이다.

이 차이를 명확히 알고 써야 구조가 깔끔해진다.

---

## 1. Flexbox란?

**Flexbox(Flexible Box Layout)** 는 1차원(가로 혹은 세로) 레이아웃을 다루는 도구이다.

즉, 한 축 기준으로 아이템을 정렬하고 배치하는 게 목적이다.

```css
.container {
    display: flex;
}
```

이렇게 `display: flex`만 써도,

자식 요소들이 한 줄에 쫙 붙는다.

가로 정렬이 기본이지만 `flex-direction`으로 축을 바꿀 수도 있다.

```css
.container {
    flex-direction: column; /* 세로 정렬 */
}
```

### 주요 속성들

| 속성              | 설명                            |
| ----------------- | ------------------------------- |
| `flex-direction`  | 주축 방향 설정 (row, column 등) |
| `justify-content` | 주축 정렬 (가로 방향 정렬)      |
| `align-items`     | 교차축 정렬 (세로 방향 정렬)    |
| `flex-wrap`       | 줄바꿈 여부 설정                |
| `gap`             | 아이템 간 간격                  |

예를 들어, 가로로 아이템을 가운데 정렬하려면 이렇게 한다.

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

Flexbox는 **콘텐츠 크기에 따라 자동 정렬이 필요할 때** 특히 유용하다.

대표적인 예시가 **네비게이션 바, 버튼 그룹, 카드 리스트** 같은 것들이다.

---

## 2. Grid란?

**CSS Grid Layout**은 2차원(행과 열)을 동시에 다루는 레이아웃 시스템이다.

말 그대로 “격자(grid)” 기반으로 화면을 설계하는 방식이다.

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 16px;
}
```

이렇게 하면 3개의 열이 자동으로 생기고,

각 칸(`1fr` 단위)이 동일한 비율로 나뉜다.

### 주요 속성들

| 속성                           | 설명                    |
| ------------------------------ | ----------------------- |
| `grid-template-columns`        | 열의 개수와 크기 정의   |
| `grid-template-rows`           | 행의 개수와 크기 정의   |
| `grid-gap` 또는 `gap`          | 셀 간 간격              |
| `grid-column` / `grid-row`     | 개별 아이템의 위치 조정 |
| `justify-items`, `align-items` | 셀 내부 정렬            |

예를 들어, 간단한 2행 3열 레이아웃은 이렇게 만든다.

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 200px);
}
```

Grid는 **레이아웃 자체를 설계할 때** 유용하다.

즉, 카드가 여러 줄로 반복되거나, 페이지 전체 구조를 만들 때 적합하다.

---

## 3. Flexbox vs Grid 핵심 차이

| 비교 항목       | Flexbox                             | Grid                     |
| --------------- | ----------------------------------- | ------------------------ |
| **차원**        | 1차원 (row 또는 column)             | 2차원 (row + column)     |
| **정렬 기준**   | 콘텐츠 중심                         | 레이아웃 중심            |
| **주요 사용처** | 네비게이션, 버튼 정렬, 작은 UI 요소 | 전체 페이지, 카드 그리드 |
| **크기 계산**   | 콘텐츠 기반                         | 셀 기반 (고정 구조)      |
| **gap 지원**    | 있음 (modern browsers)              | 있음                     |
| **유연성**      | 매우 높음                           | 정형화된 구조에 강함     |

간단히 말하면,

-   **Flexbox**는 “아이템을 자연스럽게 배치”
-   **Grid**는 “화면의 틀을 설계”

이런 식으로 생각하면 된다.

---

## 4. 함께 쓰는 패턴

실제 프로젝트에서는 Flexbox와 Grid를 **같이 쓴다.**

예를 들어 카드 리스트를 만든다고 하면,

-   바깥 전체 레이아웃은 **Grid**
-   카드 내부의 정렬은 **Flexbox**

이런 식이다 👇

```css
.card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
```

이 패턴은 **“큰 틀은 Grid, 내부 정렬은 Flex”** 구조로,

요즘 대부분의 UI가 이렇게 구성된다.

---

## 5. Flexbox만으로 할 수 있는가?

단순히 세 줄짜리 UI라면 Flexbox만으로 충분하다.

`flex-wrap`을 써서 줄바꿈을 허용하면 간단한 카드 배치도 된다.

```css
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}
```

하지만 “이 행엔 3개, 다음 행엔 2개” 같은 구조적 배치는

Flexbox만으로는 한계가 있다.

그때는 Grid가 훨씬 깔끔하다.

---

## 6. 요약

| 상황                                 | 추천                            |
| ------------------------------------ | ------------------------------- |
| 한 줄 정렬 (버튼, 네비게이션 등)     | Flexbox                         |
| 복잡한 페이지 구조                   | Grid                            |
| 단순 리스트 + 반응형                 | Grid + `auto-fill` / `minmax()` |
| 내부 정렬 (카드 내부 콘텐츠 정렬 등) | Flexbox                         |

---

## 7. 마무리

Flexbox와 Grid는 서로 경쟁하는 기술이 아니다.

**각자의 역할이 다르다.**

Flexbox는 “정렬” 중심이고, Grid는 “레이아웃 설계” 중심이다.

결국 중요한 건 “이 UI가 어떤 구조로 표현되어야 하는가”이다.

그걸 기준으로 Flexbox냐 Grid냐를 판단하면 된다.

둘 다 완전히 익히면,

HTML 구조를 짜는 시간이 눈에 띄게 줄어든다.

그리고 “정렬이 안 맞네” 같은 스트레스도 사라진다.
