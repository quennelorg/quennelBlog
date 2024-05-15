---
slug: proxy
title: 代理模式
authors: quennel
tags: [DesignModel, proxy]
date: 2024-05-08T13:14
---

## 代理模式

顾名思义，为其他对象提供一种代理用来可以对这个对象进行访问

这个其实非常好理解，在代理模式当中，任何事情如果不方便直接被访问的时候，则可以通过代理来访问，或者如果没有相关逻辑的时候，可以通过代理来实现相关逻辑

举个实际例子：
- 我有很多房子要卖，但是我不想实际接触到购房者，我就交给中介，让他作为我的代理来卖房
- 我卖房子被骗了，需要打官司，我不会打官司，这时候我需要交给律师，让他作为我的代理来打官司

应用：
- 实际上，在前端最经常用到的虚拟代理就是图片预加载，也就是如果需要加载一个图片，然后这个图片是很大，或者网上的资源加载很慢，或者加载失败等等，在这一个image的对象中，就需要有一个虚拟的代理存在，如果发生以上的情况，则用一个占位符，兜底图片来作为虚拟代理展示出去
- 还有一种就是拦截器interceptor，来作为代理对象的访问方式，比如请求前的数据处理和请求后的数据处理，相当于加一个中间层
- 远程代理也是一种模式，来用作远程访问资源等 
- 还有很多很多的应用，代理是一个非常常见的思想，有静态和动态的区分，静态是已经写好固定的代理，动态是运行时才会决定的代理。

todo： 实践java的代理类