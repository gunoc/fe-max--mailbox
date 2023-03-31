---
marp: true
# theme: uncover
# class: invert
pagination: true
---

# 프라미스화 

---
콜백 받는 함수 => **프라미스를 반환하는 함수**

로 바꾸는 것! (promisification)

---

```javascript
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}에러가 발생함`));

  document.head.append(script);
}


```
따로따로 onload, onerror

---

```javascript
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

```

promise를 통해 resolve시, error시로 간단히 나누어줌



---

프라미스화는 콜백을 완전히 대체하지 못함
- 프라미스: 하나의 결과만 가진다
- 콜백: 여러 번 호출 가능

=> 프라미스화는 콜백을 **단 한 번** 호출하는 함수에만 적용
=> 프라미스화한 함수의 콜백을 여러 번 호출해도 두 번째부터 무시된다


---

# 마이크로태스크

---
프라미스 핸들러 .then/catch/finally는 항상 비동기적으로 실행

- 지연 없이 즉시 실행되더라도 .then/catch/finally 아래에 있는 동기적 코드가 먼저 실행


---
```javascript
let promise = Promise.resolve();

promise.then(() => alert("프라미스 성공!"));

alert("코드 종료"); // 얼럿 창이 가장 먼저
```
---
# 마이크로태스크 큐

---

프라미스 같은 비동기 작업을 처리하려면 관리가 필요

ECMA: PromiseJobs라고 내부 큐(internal queue) 명시
-

V8 엔진:  '마이크로태스크 큐(microtask queue)'
-

- V8 엔진 용어가 더 선호됨
- 프라미스 핸들러는 항상 내부 큐를 통과(비동기 작업이기에)

---
![image](https://user-images.githubusercontent.com/86706366/228862233-d6b0f1e1-78b8-40e5-bff5-05d17a772458.png)

---

## 특징
- FIFO(first-in-first-out) :  마이크로태스크 큐도 큐 이므로
- 콜스택에 아무것도 없을 때, 그제서야 시작

---

```javascript
let promise = Promise.resolve();

promise.then(() => alert("프라미스 성공!"));

alert("코드 종료"); // 얼럿 창이 가장 먼저
```
- 순서를 바꾸고 싶다면 
```javascript
Promise.resolve()
  .then(() => alert("프라미스 성공!"))
  .then(() => alert("코드 종료"));
```
- then으로 순서를 정렬


---
# 처리되지 못한 거부
자바스크립트 엔진이 어떻게 처리되지 못한 거부를 찾는지

---

## 개발자가 .catch를 달아주지 않았을 때...
마이크로태스크 큐가 빈 이후에 엔진이 unhandledrejection 이벤트를 트리거

---
```javascript
let promise = Promise.reject(new Error("프라미스 실패!"));

// 프라미스 실패!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

---
```javascript
let promise = Promise.reject(new Error("프라미스 실패!"));
setTimeout(() => promise.catch(err => alert('잡았다!')), 1000);

// Error: 프라미스 실패!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

---

# 리마인드

---

.then/catch/finally 핸들러에 적힌 코드는
- 다른 코드가 종료되고 난 후에 호출
- 순서를 정해주고 싶다면 .then 체인으로

---

