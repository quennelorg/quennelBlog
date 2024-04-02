---
slug: todoProblemSolving
title: Bolg tips for solving todo feature problem
authors: quennel
tags: [todo, ProblemSolving]
---

## Css样式
Q：编辑todo的时候，需要disable list  
A：[Best-way-to-dim-disable-a-div-in-material-ui](https://stackoverflow.com/questions/62868644/best-way-to-dim-disable-a-div-in-material-ui)
``` tsx
<Box sx={{ opacity: <contidion> ? 0.5 : 1,pointerEvents:<contidion> ? "none" : "auto"}}/>  
```



## Js
Q：比较task对象是否完全相等  
A：比较里面所有的属性用_.isEqual; 如果想排除某个属性， 那就参数里面omit掉就行 
``` js
const needOldTask = _.isEqual(_.omit(oldTask, 'id'), _.omit(task, 'id')) && operationContent === OperationContent.update;
```  
Q：输入框防抖  
A：[ts节流与防抖的封装](https://juejin.cn/post/7214458935171465276)

Q: The final argument passed to useEffect changed size between renders. The order and size of this array must remain constant.
A:[useEffect deps need array](https://stackoverflow.com/questions/59864338/the-final-argument-passed-to-useeffect-changed-size-between-renders-except-i)