---
slug: reactListKey
title: unique key for array component in React
authors: quennel
tags: [react, list, unique keys]
date: 2024-04-08T14:00
---

QA：
> Each child in an array should have a unique "key" prop.
Check the render method of TableComponent.

> MUI: [Select You have provided an out-of-range value](https://github.com/mui/material-ui/issues/18494)
> [MaterialUI Select set value is always out of range](https://stackoverflow.com/questions/60813040/materialui-select-set-value-is-always-out-of-range)

It is expected that the reason is that value has a type value.

参考内容：  
[Understanding unique keys for array children in React.js](https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js)
