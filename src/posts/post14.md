---
title: 'CSS Transition과 Framer Motion 비교'
date: '2025-03-07'
excerpt: '그중에서도 가장 많이 쓰이는 방식이 **CSS Transition**과 **Framer Motion**이다..'
tags: ['css', 'Transition', 'Motion']
image: 'css.png'
category: 'CSS'
---

프론트엔드에서 애니메이션을 구현하는 방법은 다양하다.

그중에서도 가장 많이 쓰이는 방식이 **CSS Transition**과 **Framer Motion**이다.

둘 다 “요소에 움직임을 주는 도구”지만, 접근 방식이 완전히 다르다.

이번 글에서는 두 기술의 차이와 실제로 언제 어떤 걸 써야 하는지 정리한다.

---

## 1. CSS Transition — 브라우저 기본 애니메이션

CSS Transition은 브라우저가 기본적으로 제공하는 애니메이션 기능이다.

스타일 속성이 변할 때, 그 변화를 부드럽게 이어주는 역할을 한다.

```css
.box {
    width: 100px;
    height: 100px;
    background: skyblue;
    transition: all 0.3s ease;
}

.box:hover {
    width: 200px;
    background: tomato;
}
```

마우스를 올리면 자연스럽게 색상과 크기가 변한다.

별도의 JS 코드가 필요 없고, GPU 가속도 자동으로 적용된다.

### 장점

-   **가볍고 빠르다.** (브라우저 네이티브)
-   **JS 의존성이 없다.**
-   **간단한 인터랙션에 적합하다.**

### 단점

-   **상태 기반 애니메이션만 가능하다.**
    → “hover, active, focus, class 추가” 같은 정적인 상태 변화에만 동작.
-   **복잡한 시퀀스 제어 불가.**
    → 시작, 중간, 끝 동작을 세밀하게 다루기 어렵다.
-   **조건부 애니메이션이 힘들다.**
    → JS와 연계해야 하는 순간 코드가 복잡해진다.

결국 CSS Transition은 “작고 직관적인 인터랙션”에 최적화된 도구다.

---

## 2. Framer Motion — React용 애니메이션 라이브러리

Framer Motion은 **React 컴포넌트를 기반으로 한 선언적 애니메이션 라이브러리**다.

“상태”가 아니라 “렌더링”을 기준으로 움직임을 정의한다는 게 핵심 차이점이다.

```tsx
import { motion } from 'framer-motion';

function Box() {
  return (
    <motion.divanimate={{ x: 100, opacity: 1 }}
      initial={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-24 h-24 bg-blue-400"
    />
  );
}

```

렌더링 시점에 따라 애니메이션이 동작한다.

`animate`, `initial`, `exit` 같은 props를 통해 상태 전환을 선언적으로 관리할 수 있다.

### 장점

-   **리액트 상태와 자연스럽게 연동된다.**
    → `useState`, `useEffect`와 결합해 동적 애니메이션 구현이 쉽다.
-   **복잡한 시퀀스, 트랜지션 제어 가능.**
    → 여러 요소를 동시에 움직이거나 delay, stagger를 줄 수 있다.
-   **exit 애니메이션 지원.**
    → 컴포넌트가 언마운트될 때도 자연스럽게 사라진다.
-   **물리 기반 모션 지원.**
    → `spring`, `inertia` 등 자연스러운 움직임 표현 가능.

### 단점

-   **런타임 오버헤드.**
    → JS 기반이라 Transition보다 약간의 퍼포먼스 부담이 있다.
-   **학습 곡선 존재.**
    → 애니메이션 선언 구조를 익혀야 한다.
-   **단순한 효과에는 오히려 과하다.**

---

## 3. 비교 요약

| 구분        | CSS Transition                | Framer Motion                     |
| ----------- | ----------------------------- | --------------------------------- |
| 구현 방식   | CSS 스타일 변경 시 애니메이션 | React 상태 기반 선언적 애니메이션 |
| 코드 위치   | CSS (또는 class)              | JS/TS (React 컴포넌트 내부)       |
| 제어 수준   | 단순 상태 변화만              | 조건, 순서, 이벤트 기반 가능      |
| 성능        | 브라우저 네이티브 (가벼움)    | JS 구동 (약간 무거움)             |
| 적합한 상황 | 단순 hover, active 효과       | 컴포넌트 전환, 동적 인터랙션      |
| 유지보수    | 간단하지만 제약 있음          | 자유롭지만 구조가 커짐            |

---

## 4. 실제 사용 예시 비교

### 예시 1. 버튼 hover 효과

-   **CSS Transition**
    ```css
    button {
        transition: background 0.3s ease;
    }
    button:hover {
        background: #2563eb;
    }
    ```
-   **Framer Motion**
    ```tsx
    <motion.button whileHover={{ scale: 1.05 }} />
    ```

CSS는 단순 시각 변화에 적합,

Framer Motion은 hover뿐 아니라 scale, opacity 등 여러 속성을 묶어 제어할 수 있다.

---

### 예시 2. 컴포넌트 등장/퇴장 애니메이션

-   **CSS Transition**
    → state 변화에 따라 class를 토글해야 하고, 타이밍 제어가 어렵다.
-   **Framer Motion**
    ```tsx
    <AnimatePresence>
      {isOpen && (
        <motion.divinitial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        />
      )}
    </AnimatePresence>

    ```
    → 마운트, 언마운트를 자연스럽게 연결할 수 있다.

---

## 5. 결론

-   **CSS Transition**은 “상태 변화에 따른 시각적 효과”에 강하다.
    → hover, focus, toggle 같은 단순한 UI 반응에 적합하다.
-   **Framer Motion**은 “컴포넌트 단위 애니메이션”을 위한 도구다.
    → React 상태와 함께 움직이며, 복잡한 전환이나 시퀀스에 유리하다.

결국 선택 기준은 **복잡도**다.

작은 UI 반응엔 Transition,

사용자 흐름이 있는 인터랙션엔 Framer Motion이 정답이다.
