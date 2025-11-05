---
title: 'React.memo와 useMemo, useCallback의 차이'
date: '2025-03-08'
excerpt: 'React.memo와 useMemo, useCallback 적용대상과 최적화 방법애 대해.'
tags: ['React']
image: 'react.png'
category: 'react'
---

리액트에서 불필요한 렌더링을 피하고 싶을 때 자주 등장하는 게 바로 이 세 가지다.

이 세 개는 이름이 비슷하지만, **적용 대상과 최적화 방식이 완전히 다르다.**

---

## React.memo — 컴포넌트 자체를 메모이제이션

`React.memo`는 **컴포넌트를 감싸서 불필요한 리렌더링을 막는 HOC**다.

즉, props가 바뀌지 않았다면 컴포넌트를 다시 렌더링하지 않는다.

```jsx
import React from 'react';

const Child = React.memo(({ value }) => {
    console.log('Child render');
    return <div>{value}</div>;
});

export default function Parent() {
    const [count, setCount] = React.useState(0);

    return (
        <>
            <button onClick={() => setCount(count + 1)}>+</button>
            <Child value="Hello" />
        </>
    );
}
```

버튼을 클릭해도 Parent는 리렌더링되지만, Child는 props가 그대로라 리렌더링되지 않는다.

콘솔에는 처음 한 번만 `"Child render"`가 찍힌다.

### 언제 쓰면 좋을까?

-   props가 자주 바뀌지 않는 하위 컴포넌트
-   반복되는 UI(리스트 항목, 카드 등)

### 주의할 점

-   얕은 비교(Shallow Compare)만 한다.
-   props로 객체나 함수를 넘기면 항상 새 참조로 인식돼 리렌더링될 수 있다.
    → 여기서 useMemo와 useCallback이 필요하다.

---

## useMemo — 계산 결과를 기억

`useMemo`는 **값(연산 결과)을 메모이제이션**한다.

렌더링마다 무거운 계산을 다시 하지 않게 막는 용도다.

```jsx
const result = useMemo(() => {
    return heavyCalculation(value);
}, [value]);
```

`value`가 바뀌지 않으면 `heavyCalculation`은 다시 실행되지 않고, 이전 결과를 재사용한다.

### 예제

```jsx
function ExpensiveComponent({ value }) {
    const computed = React.useMemo(() => {
        console.log('Calculating...');
        return value * 2;
    }, [value]);

    return <div>{computed}</div>;
}
```

`value`가 변하지 않으면 `"Calculating..."`은 한 번만 출력된다.

### 언제 쓰면 좋을까?

-   연산 비용이 큰 계산 결과를 캐싱하고 싶을 때
-   렌더링마다 다시 계산할 필요 없을 때

### 주의할 점

-   남발하면 오히려 성능이 떨어질 수 있다.
-   계산량이 충분히 클 때만 쓰는 것이 좋다.

---

## useCallback — 함수 참조를 기억

`useCallback`은 **함수 자체를 메모이제이션**한다.

즉, props로 넘기는 함수가 매 렌더링마다 새로 만들어지는 것을 막는다.

```jsx
const handleClick = useCallback(() => {
    console.log('Clicked!');
}, []);
```

이 함수는 의존성이 바뀔 때만 새로 생성된다.

### 예제

```jsx
const Child = React.memo(({ onClick }) => {
    console.log('Child render');
    return <button onClick={onClick}>Click</button>;
});

export default function Parent() {
    const [count, setCount] = React.useState(0);

    const handleClick = React.useCallback(() => {
        console.log('clicked!');
    }, []);

    return (
        <>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
            <Child onClick={handleClick} />
        </>
    );
}
```

useCallback으로 감싸지 않으면 매 렌더링마다 새로운 함수가 생성돼 Child가 계속 리렌더링된다.

---

## React.memo, useMemo, useCallback 비교

| 구분        | 대상     | 역할                                | 사용 예시                 |
| ----------- | -------- | ----------------------------------- | ------------------------- |
| React.memo  | 컴포넌트 | props가 바뀌지 않으면 리렌더링 방지 | 하위 컴포넌트 감싸기      |
| useMemo     | 값       | 연산 결과 캐싱                      | 계산량 많은 값 재사용     |
| useCallback | 함수     | 함수 참조 유지                      | 하위 컴포넌트에 콜백 전달 |

---

## 실제 사용 팁

-   Redux는 `useSelector`가 참조 변경 시 리렌더링되므로, 하위 컴포넌트에 콜백 전달 시 useCallback 필요
-   Zustand는 부분 구독(selector)으로 불필요한 렌더링 줄일 수 있지만, store 함수 props 전달 시 useCallback 추천

즉, **상태 관리 라이브러리에 따라 memoization 전략도 달라져야 한다.**

---

## 정리

| 상황                                | 써야 하는 것 |
| ----------------------------------- | ------------ |
| 컴포넌트가 불필요하게 리렌더링될 때 | React.memo   |
| 계산 결과를 캐싱하고 싶을 때        | useMemo      |
| 함수 참조가 바뀌어서 렌더링될 때    | useCallback  |

---

## 결론

React 최적화는 단순히 렌더링을 막는 것이 아니라,

**진짜 필요한 렌더링만 일어나게 만드는 것**이다.

“무엇이 바뀌었을 때 렌더링되는지”를 이해하는 게 가장 중요하다.

렌더링을 막는 것이 아니라, **렌더링의 이유를 통제하는 것**이 진짜 최적화다.
