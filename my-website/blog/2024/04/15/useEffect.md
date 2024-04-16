---
slug: useEffect
title: useEffect常见问题记录1
authors: quennel
tags: [react, useEffect, hook]
date: 2024-04-15T16:50
---

## [useEffect](https://react.dev/reference/react/useEffect)
useEffect 是一个 React Hook，可让您将组件与外部系统同步。 
```
useEffect(setup, dependencies?)
```
设计思想： 在React中，effect可以让你的组件与外部系统（如非React小部件、浏览器DOM或网络操作）进行同步


### 参数
#### setup
这里写执行函数
#### dependencies
- 执行函数之前的依赖值，必须用[dep1,dep2....]数组写
- 传递依赖数组、空数组和不传递依赖项之间的区别: 
```
// 如果完全不传递依赖数组，则 Effect 会在组件的 每次单独渲染（和重新渲染）之后 运行
useEffect(() => {
  // ...
}); // 总是再次运行

// 如果你的 Effect 确实没有使用任何响应式值，则它仅在 初始渲染后 运行。
useEffect(() => {
  // ...
}, []); // 不会再次运行（开发环境下除外)

// 如果指定了依赖项，则 Effect 在 初始渲染后以及依赖项变更的重新渲染后 运行。
useEffect(() => {
  // ...
}, [a, b]); // 如果 a 或 b 不同则会再次运行
```
## 注意事项
### useEffect 一直重复运行
如果你写了log在useEffect里面，然后发现这个方法一直无限循环的运行，就可以看看这个是否是：
依赖项做了改变，然后就会运行useEffect，然后里面的运行方法又更改了依赖项，就会导致无限循环
- 这时候要去考虑依赖项的改变为什么会在useEffect里去写
- 如果依赖项必须要被改动，可以考虑换一个不同的依赖项
### 不需要所有的内容都写在Effect里
也就是说如果没有打算与某个外部系统同步，那么可能不需要Effect
[You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

#### 渲染数据的逻辑处理
很多数据的处理逻辑并不需要在useEffect里写，比如关于 prop，state数据的计算处理，如果放在useEffect会造成多次计算，多次渲染，多次调用的后果
- 如果一个值可以基于现有props或state计算的出，并不需要将它作为state，更不需要放在useEffect里
例如：
```
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 避免：多余的 state 和不必要的 Effect
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  // ...
}

function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ 非常好：在渲染期间进行计算
  const fullName = firstName + ' ' + lastName;
  // ...
}
```
如果用复杂的做法，react会先用fullName的旧值执行了整个渲染流程，然后立即使用更新后的值又重新渲染了一遍

- 缓存复杂的计算
```
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');

  // 🔴 避免：多余的 state 和不必要的 Effect
  const [visibleTodos, setVisibleTodos] = useState([]);
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter));
  }, [todos, filter]);

  // ...
}

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ 如果 getFilteredTodos() 的耗时不长，这样写就可以了。
  const visibleTodos = getFilteredTodos(todos, filter);
  // ...
}
```
  
- Advance： 可以使用 [useMemo](https://react.dev/reference/react/useMemo) 缓存（或者说 memoize）一个复杂的计算
```
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  const visibleTodos = useMemo(() => {
    // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);
  // ...
}

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行 getFilteredTodos()
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
  // ...
}
```
这会告诉 React，除非 todos 或 filter 发生变化，否则不要重新执行传入的函数。React 会在初次渲染的时候记住 getFilteredTodos() 的返回值。在下一次渲染中，它会检查 todos 或 filter 是否发生了变化。如果它们跟上次渲染时一样，useMemo 会直接返回它最后保存的结果。如果不一样，React 将再次调用传入的函数（并保存它的结果）。

你传入 useMemo 的函数会在渲染期间执行，所以它仅适用于 纯函数 场景。
#### 不必使用 Effect 来处理用户事件
如果逻辑是在相关事件的处理有关，则应该放在相应的事件处理函数；在触发事件后，处理事件的回调函数如果在useEffect中则需要等到渲染结束后执行，这时如果有多个事件产生，执行的顺序可能和触发的顺序不一致。  
这有个例子：
这个 Form 组件会发送两种 POST 请求。它在页面加载之际会发送一个分析请求。当你填写表格并点击提交按钮时，它会向 /api/register 接口发送一个 POST 请求
```
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ 非常好：这个逻辑应该在组件显示时执行
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  // 🔴 避免：在 Effect 中处理属于事件特定的逻辑
  const [jsonToSubmit, setJsonToSubmit] = useState(null);
  useEffect(() => {
    if (jsonToSubmit !== null) {
      post('/api/register', jsonToSubmit);
    }
  }, [jsonToSubmit]);

  function handleSubmit(e) {
    e.preventDefault();
    setJsonToSubmit({ firstName, lastName });
  }
  // ...
}
```
分析请求应该保留在 Effect 中。这是 因为 发送分析请求是表单显示时就需要执行的.然而，发送到 /api/register 的 POST 请求并不是由表单 显示 时引起的。你只想在一个特定的时间点发送请求：当用户按下按钮时。它应该只在这个 特定的交互 中发生。删除第二个 Effect，将该 POST 请求移入事件处理函数中：
```
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ 非常好：这个逻辑应该在组件显示时执行
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // ✅ 非常好：事件特定的逻辑在事件处理函数中处理
    post('/api/register', { firstName, lastName });
  }
  // ...
}
```
当你决定将某些逻辑放入事件处理函数还是 Effect 中时，你需要回答的主要问题是：从用户的角度来看它是 怎样的逻辑。如果这个逻辑是由某个特定的交互引起的，请将它保留在相应的事件处理函数中。如果是由用户在屏幕上 看到 组件时引起的，请将它保留在 Effect 中。