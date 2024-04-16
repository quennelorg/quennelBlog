---
slug: useMemo
title: Study useMemo
authors: quennel
tags: [react, hook, useMemo, useCallback]
date: 2024-04-16T20:55
---

## [useMemo](https://react.dev/reference/react/useMemo)

useMemo is a React Hook that lets you cache the result of a calculation between re-renders.

```
const cachedValue = useMemo(calculateValue, dependencies)
```

useCallback is a React Hook that lets you cache a function definition between re-renders.
```
const cachedFn = useCallback(fn, dependencies)
```

Diff 
```
const cachedFn = useCallback(fn, dependencies)
const cachedValue = useMemo(() => fn, dependencies)
```
- useMemo caches the result of a function call. In this case, it caches the result of calling fn. It will not change unless the dependencies change.
- useCallback caches the function itself. Unlike useMemo, it does not call the function you pass to it. Instead, it caches the function itself. Therefore, unless the dependencies change, the function fn itself will not change
### Important

useMemo or useCallback（Base useMemo）as a performance optimization

> Therefore, if these two are not used, the code should still work correctly.

> Using these two hooks allows certain logic to be executed only when the dependencies change. This ensures that if the dependencies remain unchanged and the page is re-rendered, this portion of the logic does not need to be executed again.


