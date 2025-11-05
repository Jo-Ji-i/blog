---
title: 'TypeScript 기본기: 타입 시스템으로 버그 줄이기'
date: '2025-03-06'
excerpt: 'TypeScript 기본기 다지기!'
tags: ['typescript']
image: 'ts.png'
category: 'typescript'
---

JavaScript는 자유롭다.

근데 너무 자유로워서 종종 발목을 잡는다.

`undefined`나 `null`이 갑자기 튀어나오고,

객체 구조가 바뀌면 런타임 에러가 터지는 경우도 흔하다.

그래서 나온 게 TypeScript이다.

TypeScript는 **JavaScript에 타입 시스템을 추가한 언어**이다.

코드 실행 전에 에러를 미리 잡아내고,

개발자가 의도한 데이터 형태를 명확히 정의할 수 있다.

---

## 1. 타입이 필요한 이유

예를 들어 JavaScript에서 이런 코드가 있다고 하자.

```jsx
function greet(user) {
    return 'Hello, ' + user.name.toUpperCase();
}
```

이 코드는 `user`가 `null`이거나 `name`이 없으면 바로 터진다.

그런데 TypeScript에서는 이렇게 된다.

```tsx
function greet(user: { name: string }) {
    return 'Hello, ' + user.name.toUpperCase();
}
```

이제 `user`가 `{ name: string }` 형태가 아니면

컴파일 단계에서 에러를 내준다.

실행하기도 전에 버그를 잡는 셈이다.

---

## 2. 기본 타입

TypeScript는 자주 쓰는 기본 타입들을 미리 정의해둔다.

```tsx
let count: number = 10;
let username: string = 'jimin';
let isActive: boolean = true;
```

이렇게 변수마다 타입을 명시할 수도 있고,

초기값을 기준으로 자동 추론도 된다.

```tsx
let score = 99; // number로 추론됨
```

---

## 3. 객체 타입과 인터페이스

객체 구조를 정의할 때는 인터페이스나 타입 별칭을 쓴다.

```tsx
interface User {
    name: string;
    age: number;
}

const me: User = {
    name: 'jimin',
    age: 26,
};
```

이러면 `User` 타입을 다른 곳에서도 재사용할 수 있다.

`interface` 대신 `type`을 써도 거의 비슷하게 동작한다.

```tsx
type Product = {
    id: number;
    title: string;
};
```

---

## 4. 함수 타입

함수에도 명시적으로 타입을 붙일 수 있다.

```tsx
function sum(a: number, b: number): number {
    return a + b;
}
```

매개변수 타입, 반환 타입까지 지정하면

“문자열 더하기 같은 실수”를 사전에 막을 수 있다.

---

## 5. 유니언 타입과 옵셔널

유니언 타입은 변수에 여러 타입을 허용할 때 쓴다.

```tsx
let id: string | number;
id = 123;
id = 'abc';
```

옵셔널(`?`)은 속성이 있어도 되고 없어도 될 때 쓴다.

```tsx
interface User {
    name: string;
    age?: number;
}
```

이러면 `age`를 안 넣어도 에러가 나지 않는다.

---

## 6. 제네릭 (Generic)

제네릭은 **타입을 함수처럼 재사용**할 수 있게 해준다.

예를 들어 배열의 첫 번째 값을 반환하는 함수를 만든다고 하자.

```tsx
function getFirst<T>(arr: T[]): T {
    return arr[0];
}

const num = getFirst([1, 2, 3]); // number
const str = getFirst(['a', 'b', 'c']); // string
```

타입을 매번 새로 정의하지 않아도,

함수 호출 시점에 알아서 타입이 정해진다.

---

## 7. 타입 추론과 타입 단언

TypeScript는 대부분의 경우 타입을 **자동으로 추론**한다.

하지만 때로는 “이건 내가 확실히 알아”라고 알려줄 필요가 있다.

그때 쓰는 게 **타입 단언(as)**이다.

```tsx
const el = document.querySelector('#username') as HTMLInputElement;
el.value = 'jimin';
```

단언은 강력하지만, 남용하면 런타임 에러로 이어질 수 있다.

정말 확실한 경우에만 쓰는 게 좋다.

---

## 8. any, unknown, never

-   **any**: 뭐든지 허용 (사실상 타입 포기)
    ```tsx
    let value: any = 10;
    value = 'string'; // 가능
    ```
    → 타입스크립트를 쓰는 의미가 줄어든다.
-   **unknown**: any보다 안전한 버전
    ```tsx
    let data: unknown;
    if (typeof data === 'string') {
        console.log(data.toUpperCase());
    }
    ```
-   **never**: 절대 발생하지 않는 값
    ```tsx
    function fail(msg: string): never {
        throw new Error(msg);
    }
    ```

---

## 9. 타입 시스템의 진짜 장점

타입스크립트의 진짜 힘은

“버그를 미리 잡는다”보다

**“개발 경험을 훨씬 개선시킨다”**는 데 있다.

-   IDE 자동완성
-   타입 기반 리팩토링
-   팀 간 코드 일관성 유지

이런 부분에서 TS는 장기적으로 엄청난 생산성 차이를 만든다.

---

## 10. 마무리

TypeScript는 처음엔 귀찮게 느껴질 수 있다.

하지만 프로젝트가 커질수록 **“타입이 곧 문서”**가 된다.

타입 정의만 봐도 구조가 보이고,

타입 에러가 곧 버그 탐지기 역할을 한다.

결국, 타입 시스템은 코드를 더 안전하게 만들고,

개발자가 의도한 로직을 명확하게 표현하게 해준다.

그게 TypeScript의 가장 큰 가치이다.
