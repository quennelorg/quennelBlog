---
slug: state
title: 状态模式
authors: quennel
tags: [DesignModel, state]
date: 2024-05-10T16:26
---

## 状态模式
行为型

> 当一个对象内在状态改变时允许改变其行为，这个对象看起来像是改变了其类。


顾名思义，跟状态有关的模式，如果再代码中有很多的分支，就说明有很多的状态，每一种状态就是一个逻辑，这时候就可以用到这个模式，也就是将复杂的状态逻辑简化

实现起来也就是将状态的行为拆分出来，然后有一个类抽出状态，然后根据需要选择不同的状态

这个跟策略模式有些相像，但是实际是不一样的
- 状态模式不同的状态里面的逻辑是完全不一样，比如一个订单的状态如果不一样，即使处理方法是一样的，那么逻辑也会是不一样
- 策略模式是拆分成可以互相替换的算法，而这些算法对象都是同一个目标，只是实现不一样，比如支付这个目标，我们可以用支付宝，微信等策略







参考：
https://github.com/quennelorg/designModelTraining/tree/main/app/src/main/java/state