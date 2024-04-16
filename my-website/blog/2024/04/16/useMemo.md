---
slug: useMemo
title: 研究useMemo
authors: quennel
tags: [react, hook, useMemo, useCallback]
date: 2024-04-16T20:55
---

## [useMemo](https://react.dev/reference/react/useMemo)

useMemo 是一个 React Hook，它在每次重新渲染的时候能够缓存计算的结果

```
const cachedValue = useMemo(calculateValue, dependencies)
```

useCallback 是一个允许你在多次渲染中缓存函数的 React Hook。
```
const cachedFn = useCallback(fn, dependencies)
```

这两个区别在于： 
```
const cachedFn = useCallback(fn, dependencies)
const cachedValue = useMemo(() => fn, dependencies)
```
- useMemo 缓存函数调用的结果。在这里，它缓存了调用 fn 的结果。除非 dependencies 发生改变，否则它将不会发生变化。
- useCallback 缓存函数本身。不像 useMemo，它不会调用你传入的函数。相反，它缓存此函数。从而除非 dependencies 发生改变，fn 自己将不会发生改变。
### 注意事项

useMemo或者useCallback（基于useMemo）都是一个性能优化的手段

> 因此如果不使用这两个，代码应该也要正常工作

> 使用这两个，会使部分逻辑只在依赖项改变的时候才会执行，这样能够保证一个页面中，如果依赖项没有改变，而重新渲染页面的时候，这部分逻辑是不需要再次执行


