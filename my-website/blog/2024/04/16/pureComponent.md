---
slug: pureComponent
title: 保持组件纯粹
authors: quennel
tags: [react, hook, pureComponent]
date: 2024-04-16T07:23
---

## [Keeping Components Pure](https://react.dev/learn/keeping-components-pure)

### 纯函数
函数组件应该保持纯粹，也就是输入什么，输出什么，而且如果输入相同，则输出也相同
- 只负责自己的任务。它不会更改在该函数调用前就已存在的对象或变量。
- 输入相同，则输出相同。给定相同的输入，纯函数应总是返回相同的结果。

举个你非常熟悉的纯函数示例：数学中的公式。

考虑如下数学公式：y = 2x。

若 x = 2 则 y = 4。永远如此。

若 x = 3 则 y = 6。永远如此。

若 x = 3，那么 y 并不会因为时间或股市的影响，而有时等于 9 、 –1 或 2.5。

若 y = 2x 且 x = 3, 那么 y 永远 等于 6.

我们使用 JavaScript 的函数实现，看起来将会是这样：
```
function double(number) {
  return 2 * number;
}
```
double() 就是一个 纯函数。如果你传入 3 ，它将总是返回 6 

### React 函数组件
React 便围绕着这个概念进行设计。
React 假设你编写的所有组件都是纯函数。也就是说，对于相同的输入，你所编写的 React 组件必须总是返回相同的 JSX。
#### 正确的样例
```
function Recipe({ drinkers }) {
  return (
    <ol>    
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}

```

#### 错误的样例
```
let guest = 0;

function Cup() {
  // Bad：正在更改预先存在的变量！
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```
该组件正在读写其外部声明的 guest 变量。这意味着 多次调用这个组件会产生不同的 JSX！并且，如果 其他 组件读取 guest ，它们也会产生不同的 JSX，其结果取决于它们何时被渲染！这是无法预测的。

回到我们的公式 y = 2x ，现在即使 x = 2 ，我们也不能相信 y = 4 。