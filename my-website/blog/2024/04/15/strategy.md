---
slug: strategy
title: 研究策略模式
authors: quennel
tags: [DesignModel, strategy]
date: 2024-04-15T15:50
---

## 策略模式
- 这个模式就非常简单，策略模式，顾名思义，针对策略的模式，针对不同的算法，我们可以分开实现，把各种逻辑拆分开来，这样可以复用在其他地方。 这个在重构中是最大的利器。
- 而且这个模式能够非常容易的解决if的问题，针对这些if，可以将不同的逻辑都抽取出来
- 除此之外，我们将这个算法抽出来后，我们可以针对这些算法进行单元测试，这样也能够保证稳定性，如果需求有变动，也能够安全，快速的进行改动。

### +工厂模式
策略模式可以消除大量的if，然后工厂模式可以消除大量的重复代码，我们可以将实现哪个行为根据工厂来决定，然后工厂产生的实例去决定用哪个策略

参考：
https://www.runoob.com/design-pattern/strategy-pattern.html
https://github.com/quennelorg/designModelTraining/tree/main/app/src/main/java/strategy