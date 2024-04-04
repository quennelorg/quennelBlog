---
slug: todoThink1
title: todo功能随想
authors: quennel
tags: [todo, Thinking]
---

## 起初
在开始做todo这个功能的时候，并没有想着要做成一个什么内容，也没有想这个功能的开发方向是怎么样  
最开始的想法是这个blog网站需要有一个地方去记录做过了什么事，需要做什么事，正在做什么事等等

## 现在
### 感想
todo的开发没有经过系统性的开发，属于脑子一热，就打算做，想到什么就做什么。这样其实很不敏捷，更谈不上正经的软件开发。  
尽管在做的时候会刻意去将**开发思维**进行运用，但是回过头来才发现，这不是一个连贯的过程，总体来说整个开发进度和流程是有非常大的提升空间
## 项目流程
去youtube或相关网站寻找关于 todo react的资源, 以下是一些在本功能开发中做过参考的：
- [React JS Todo List App using Local Storage I React JS Beginner Project](https://www.youtube.com/watch?v=fLxm6qiJYzg)
- [Build a Todo App with React.js | Beginner React Project using hooks](https://www.youtube.com/watch?v=QdTHUv79EZc)
### 开始功能开发
弄一个输入框，提交按钮；输入内容，用useState保存输入框的字符，然后点击提交按钮输出字符
- 这个时候会下意识的弄一个model去存储task的类型，其中除了id，name，会想到以后还会有优先级，然后又会想到是否可以用mvvm的框架去组织这个功能。
- 这时候碰到一个问题，如何在useState中将type定义，这里有参考[Set types on useState React Hook with TypeScript](https://stackoverflow.com/questions/53650468/set-types-on-usestate-react-hook-with-typescript)
- 但是实际上发现，**很多时候在做的过程中会想到很多点子，或者发现很多bug，这时候如果放下当前要去实现，去弄灵光一闪的点子是非常混乱的，如果这个点子能够快速弄完还好，如果这个点子需要花好多时间，一时不能够完成，这时候就会打乱之前的计划**
- 这个问题一直贯穿整个功能开发，目前想到的方法就是想到点子就先记下来，**如果能够快速实现或者这个点子是跟现在正在做的事情强相关的，就把这个点子放在最高优先级的事情，如果这个点子需要花更多时间，或者跟现在做的事情没什么联系的，就记录下来。**
- 开始想的数据是放在 [docusaurus.config](https://docusaurus.io/zh-CN/docs/configuration)保存，但是实践发现，这个config是static，不能够dynamic。config只适合保存配置相关的数据，并不能够随时增删查改。
- 关于config的设想，其实可以参考 nacos 去读取动态的config，不过这就是一个优先级很低的卡，先敏捷的快速开发出基本的功能，然后再根据实际需要再决定开不开这些卡。
- 聊到卡，其实可以将点子弄成卡的形式，也就是重构todo页面，**除了每日任务外，将md的task弄成卡ui的形式。**
### 开发中端 
输入框和提交按钮调试完成，准备用localStorage临时存储数据，并且增加Alert
- 开发调试完输入框和输入功能，提交按钮的提交功能之外，临时想到Alert的tip功能，就先放下用localStorage，当时想的是如果用localStorage会不好调试（可能是因为觉得不熟悉的技术用起来会花费很多时间，不能够快速有个功能）
- Alert功能也需要一个Alert的model来对不同等级的Alert进行分类，这时候就看出来了model的重要性，而且Alert的级别和task type做了mapping，用了新的方法[record](https://zhuanlan.zhihu.com/p/356662885)来做，这样实践了一种新的实现方式
- 在开发Alert功能的时候，由于对ui的纠结，于是研究起了mui，由于之前有用过mui+react一套，所以就打算将mui用在docusaurus。
- 也就是整个项目的大框架还是docusaurus，在某些特殊功能，用mui来做render 参考文档：[How to use Material UI with Docusaurus](https://webreaper.dev/posts/material-ui-theme-with-docusaurus/)
- 在研究docusaurus的时候，发现官方documentation有很多可支持的功能和插件，比如theme相关的[config](https://docusaurus.io/docs/api/themes/configuration)而且还提供了[竞品网站的特点介绍](https://docusaurus.io/docs#comparison-with-other-tools)
- 感想：**之后在学习一个新技术的时候，首先了解官方提供的文档，并且大体看一遍，看有什么让自己印象深刻的点**
### 开发第三阶段（增删查改，数据管理，优化ui）
准备用viewModel来管理数据操做，viewController负责useState，view只负责ui，方法传给view就行
- 之前在研究了mui的实现，所以这时候决定把整个task的list用mui实现，实现的过程就是将list的view抽出去，然后用prop的方式将数据和方法给到子view
- 由于页面的state很多，有taskName，editId，isEditing，list，alert等，所以这个viewController就会很大，这时候就需要先快速实现这些功能，之后再进行优化，时刻记住**小步提交，不断重构**
- viewModel的实现先放到另一个边，准备用reducer来实现，先实现task的增删查改，而且这些功能需要不断的调试
- 实现task的priority，这时候这个优先级会跟增删查改的各个功能有相关联性
- 重构task的ui，然后将这个feature放到mdx中
- 修复bug，用docusaurus的dark config 来兼容mui [use-color-mode](https://docusaurus.io/docs/next/api/themes/configuration#use-color-mode)
- 重构todoList，将具体function逐渐实现单一职责制和将多个类似的function抽出共同体，比如将task相关操作根据operation来走不一样的逻辑。
## 未来
这个开发到此阶段，release0.1算是可以基本上线。
接下来的目标：
- 实践设计模式，并不断实践重构
- 决定使用localStorage来实现基本的数据存储，这一阶段如果完成，之后决定用数据库来存储todo，并且部署到云端
- 使用reducer来管理数据
- 增加todo task拖拽，更改任务优先级能力
- 编辑的时候，如果内容没有更新，保持原来taskId
