---
title: 'State 와 Ref 비교'
date: '2025-02-25'
excerpt: 'state는 언제쓰고 Ref는 또 뭔지.....그 차이에 대해 알아보자!'
tags: ['state', 'ref', 'React']
image: 'react.png'
category: 'react'
---

## 1. State

`state`는 **컴포넌트가 갖는 상태 값**이다.

값이 바뀌면 **컴포넌트를 다시 렌더링**하여 UI를 업데이트 한다.

### 특징

-   값이 바뀌면 **렌더링이 트리거**됨
-   **UI와 직접적으로 연결**되어 있음
-   함수형 컴포넌트에서는 `useState` 훅으로 사용
-   컴포넌트의 **생명주기와 관련됨**

### 예시

```jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increase</button>
        </div>
    );
}
```

-   버튼을 누르면 `count`가 증가하고, UI가 자동으로 업데이트됨

### 언제 사용하는가?

-   **화면에 보여지는 데이터**를 다룰 때
-   컴포넌트 **렌더링과 관련된 값**
    예: 폼 입력 값, 버튼 클릭 횟수, API로 받아온 데이터 등

---

## 2. Ref

`ref`는 **DOM 요소 혹은 렌더링과 무관한 값을 저장**하는 용도로 사용됩니다.

### 특징

-   값이 바뀌어도 **컴포넌트가 리렌더링되지 않음**
-   `current` 속성을 통해 값을 읽거나 수정
-   **컨테이너 역할**: 렌더링과 상관없는 값을 보관
-   클래스 컴포넌트의 **인스턴스 변수**와 비슷하게 사용 가능

### 예시 1: DOM 접근

```jsx
import { useRef } from 'react';

function InputFocus() {
    const inputRef = useRef(null);

    const focusInput = () => inputRef.current.focus();

    return (
        <div>
            <input ref={inputRef} placeholder="Click the button to focus" />
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
}
```

-   `inputRef`를 통해 DOM 요소에 직접 접근 가능
-   UI 렌더링과는 무관하게 특정 동작 수행

### 예시 2: 렌더링과 무관한 값 저장

```jsx
import { useRef, useState, useEffect } from 'react';

function Timer() {
    const [count, setCount] = useState(0);
    const intervalId = useRef(null); // 렌더링과 무관

    useEffect(() => {
        intervalId.current = setInterval(() => setCount((c) => c + 1), 1000);
        return () => clearInterval(intervalId.current);
    }, []);

    return <h1>{count}</h1>;
}
```

-   `intervalId`는 `ref`에 저장해서 렌더링과 무관하게 관리
-   만약 state로 저장하면 매번 setState로 인해 불필요한 리렌더링 발생

### 언제 사용하는가?

-   **DOM 요소 참조**
-   `setTimeout`, `setInterval` ID 저장
-   이전 state 값 기억
-   렌더링과 상관없는 **가변값** 관리

---

## 3. Ref vs State 정리표

| 구분          | State                  | Ref                          |
| ------------- | ---------------------- | ---------------------------- |
| 렌더링 트리거 | O                      | X                            |
| 값 저장 용도  | UI와 관련된 값         | UI와 무관한 값               |
| 선언 방식     | `useState`             | `useRef`                     |
| 접근          | 변수 그대로            | `.current`                   |
| 예시          | 버튼 클릭 횟수, 입력값 | DOM 요소, 타이머 ID, 이전 값 |

---

### 요약

-   **State**: UI에 반영되는 값, 변경 시 렌더링
-   **Ref**: 렌더링과 무관한 값, DOM 접근, 가변값 저장

즉, **렌더링과 상관없는 값은 `ref`**, **렌더링과 관련된 값은 `state`**를 사용하면 된다.
