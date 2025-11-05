---
title: 'Promise, async/await 완전 정복'
date: '2025-03-05'
excerpt: '비동기 처리 개념 제대로 잡고 싶으면 결국 Promise랑 async/await 이해해야 함.
이게 JS 비동기 처리의 핵심이고, fetch 같은 네트워크 요청이나 setTimeout 같은 것도 결국 다 이걸로 돌아감..'
tags: ['javascript', 'react']
image: 'js.png'
category: 'javascript'
---

## 1. 비동기 처리 개념

JS는 기본적으로 **싱글 스레드(single-thread)** 라서 한 번에 한 작업만 가능함.

근데 예를 들어 서버에 데이터 요청할 때 그걸 기다리느라 코드가 멈추면 답이 없잖아.

그래서 오래 걸리는 건 **비동기적으로 처리**하는 거임 — 백그라운드에서 돌리고, 다 끝나면 콜백으로 알려주는 방식.

예전엔 콜백 함수로 처리했는데 그게 바로 “콜백 지옥” 만드는 원흉.

---

## 2. 콜백 지옥이 왜 문제냐면

```jsx
doSomething((result) => {
    doSomethingElse(result, (newResult) => {
        doThirdThing(newResult, (finalResult) => {
            console.log(finalResult);
        });
    });
});
```

이런 식으로 중첩되면 코드 읽기도 힘들고, 에러 처리도 개판남.

그래서 Promise가 등장함.

“**결과를 나중에 받을 약속**”이라는 개념으로.

---

## 3. Promise 기본 개념

Promise는 “아직 완료 안 됐지만, 나중에 끝날 작업”을 표현하는 객체.

상태는 3가지:

-   **pending**: 대기 중
-   **fulfilled**: 성공
-   **rejected**: 실패

예시 ↓

```jsx
const promise = new Promise((resolve, reject) => {
    const success = true;
    if (success) resolve('성공!');
    else reject('실패...');
});

promise
    .then((value) => console.log(value))
    .catch((error) => console.error(error))
    .finally(() => console.log('끝!'));
```

-   `then`: 성공 시
-   `catch`: 실패 시
-   `finally`: 무조건 마지막에 실행

---

## 4. Promise 체이닝

Promise의 진짜 힘은 **체이닝(then chaining)** 이다.

비동기 작업을 순서대로 깔끔하게 연결할 수 있음.

```jsx
fetchUser()
    .then((user) => fetchPosts(user.id))
    .then((posts) => fetchComments(posts[0].id))
    .then((comments) => console.log(comments))
    .catch((err) => console.error(err));
```

이렇게 하면 순서대로 실행되는데, 중첩 없이 읽히는 게 장점.

다만 then 체인이 길어지면 여전히 조금 불편하긴 함.

---

## 5. async / await 문법

그래서 나온 게 `async/await`.

Promise 기반 코드인데, **동기식처럼 보이게** 만들어줌.

```jsx
async function getData() {
    try {
        const user = await fetchUser();
        const posts = await fetchPosts(user.id);
        const comments = await fetchComments(posts[0].id);
        console.log(comments);
    } catch (err) {
        console.error(err);
    }
}
```

-   `await`는 Promise가 끝날 때까지 기다림 (resolve될 때까지)
-   근데 코드가 일시 정지되는 건 그 함수 안에서만.
-   덕분에 “순서대로 실행되는 것처럼” 보이지만 실제로는 비동기.

---

## 6. async/await 규칙 몇 개

1. `await`는 무조건 `async` 함수 안에서만 쓸 수 있음.
2. `await`는 Promise가 끝날 때까지 기다림.
3. 여러 Promise를 동시에 처리하고 싶으면 `Promise.all()` 써야 함.

```jsx
async function loadData() {
    const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
    console.log(user, posts);
}
```

이건 병렬 처리라 더 빠름.

하나씩 await 하면 직렬로 돌아서 느려질 수 있음.

---

## 7. 에러 핸들링

`await`는 내부적으로 Promise를 반환하니까 `reject` 발생 시 에러 던짐.

그래서 try-catch로 감싸면 됨.

```jsx
async function fetchData() {
    try {
        const data = await getSomeData();
        console.log(data);
    } catch (err) {
        console.error('에러 발생:', err);
    }
}
```

만약 여러 개 동시에 await 한다면, `Promise.allSettled()` 쓰는 것도 좋음.

하나가 reject돼도 나머지는 실행되니까.

---

## 8. 정리

| 비교 항목   | Promise            | async/await                 |
| ----------- | ------------------ | --------------------------- |
| 코드 스타일 | 함수형 (then 체인) | 동기식 스타일               |
| 에러 처리   | `catch()`          | `try-catch`                 |
| 가독성      | 중간 정도          | 가장 좋음                   |
| 병렬 실행   | `Promise.all()`    | `Promise.all()` 그대로 사용 |

-   콜백 → Promise → async/await 순서로 발전해온 거고,
-   지금은 거의 async/await로 통일된 추세.
-   단, 여러 개 동시에 돌릴 때는 `Promise.all()` 같이 써야 함.

---

필요하면 나중에 추가로 예외 처리나 병렬/직렬 성능 비교도 해볼 수 있음.

근데 이 정도면 Promise랑 async/await은 확실히 감 잡을 수 있을 듯.
