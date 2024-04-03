---
slug: todoProblemSolving
title: Bolg tips for solving todo feature problem
authors: quennel
tags: [todo, ProblemSolving]
---


## CSS style
Q: When editing todo, you need to disable list
A：[Best-way-to-dim-disable-a-div-in-material-ui](https://stackoverflow.com/questions/62868644/best-way-to-dim-disable-a-div-in-material-ui)
``` tsx
<Box sx={{ opacity: <contidion> ? 0.5 : 1,pointerEvents:<contidion> ? "none" : "auto"}}/>  
```



Q: Compare whether task objects are completely equal
A: Use _.isEqual to compare all the attributes; if you want to exclude a certain attribute, just omit it in the parameter.
``` js
const needOldTask = _.isEqual(_.omit(oldTask, 'id'), _.omit(task, 'id')) && operationContent === OperationContent.update;
```  
Q：Throttle and Debounce
A：[ts Throttle and Debounce Encapsulation](https://juejin.cn/post/7214458935171465276)

Q: The final argument passed to useEffect changed size between renders. The order and size of this array must remain constant.
A:[useEffect deps need array](https://stackoverflow.com/questions/59864338/the-final-argument-passed-to-useeffect-changed-size-between-renders-except-i)