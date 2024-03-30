---
slug: projectSetupByFrontEnd 
title: How to setup a normal project
authors: quennel
tags: [project, setup, pre-commit, husky, pre-push]
---

## 这是一篇关于项目如何初始化的blog
**前端视角**   

每次开始一个项目的时候，很多默认配置或者库需要被配置好，这里对这些**默认配置**进行基础的研究

## Common Setting
### .gitignore
可以看这个文档了解[Ignoring files](https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files)

**build文件 和 node module**不需要被跟踪
**一些在本地run项目的配置文件**不需要被跟踪
**一些个人文件**不需要被跟踪
**一些个人文件**不需要被跟踪

### prettier
[prettier](https://prettier.io/)
这个是属于项目的一个格式规范，每个项目都有每个项目习惯的格式，所以一个自动整理格式的配置是非常有必要的，这样在多人合作的情况下，能够保证项目内所有代码的格式都是一样的

### Git hook
[githooks](https://git-scm.com/docs/githooks)
- 默认目录一般是在 `$GIT_DIR/hooks/* (or git config core.hooksPath/*)` 
- 一般在commit或者push的时候会去跑整个项目的测试，保证改动不会影响到其他功能，能够在一定程度上保证软件质量
- 还可以在这个过程中，对整个项目重新规范下格式
- 分有**客户端**和**服务端**，对应着不同的类型的hook，详细的描述可以见[前端 Git-Hooks 工程化实践 ](https://www.cnblogs.com/dtux/p/16419271.html)
#### 常用的 **pre-commit**
该钩子由 git-commit[1] 调用，并且可以使用 --no-verify 选项绕过。它不带任何参数，并且在获取建议的提交日志消息并进行提交之前调用。
从此脚本中以非零状态退出会导致 git commit 命令在创建提交之前中止。
默认的预提交挂钩在启用时会捕获带有尾随空格的行的引入，并在找到此类行时中止提交。
#### 常用的 **commit-msg**
该钩子接收一个参数，存有当前提交信息的临时文件的路径。 如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。
#### 常用的 **pre-push**
该钩子由 git-push调用，可用于防止发生推送，再推送前跑下测试之类的，可以用--no-verify绕过。  
如果此钩子以非零状态退出，则 git Push 将中止而不推送任何内容。有关推送被拒绝原因的信息可以通过写入标准错误发送给用户。
#### [husky](https://typicode.github.io/husky/)
[huskyGithub](https://github.com/typicode/husky)  
- 可以把pre commit， pre push 的hook暴露到外面，可以给整个项目定一个hook，多人合作的时候共享同一个
- 当commit或push的时候，可以检测提交消息，运行测试，检测代码，只需要在.husky写好配置就行，husky触发所有git钩子脚本，不需要自己在.git/hooks写shell脚本


## Special Setting