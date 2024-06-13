---
slug: githubActionsBasic
title: Github Actions - Basic
authors: quennel
tags: [Github Actions, exercise]
date: 2024-06-12T14:02
---

## 什么是[GitHub Actions](https://docs.github.com/en/actions)

GitHub Actions 是 GitHub 提供的一种持续集成和持续部署（CI/CD）服务。它允许开发者在 GitHub 仓库中自动化他们的工作流，例如构建、测试和部署代码。通过定义工作流文件，开发者可以在代码仓库的特定事件（如代码推送、Pull Request 等）发生时自动触发相应的任务

### [Workflows](https://docs.github.com/en/actions/using-workflows)
GitHub Workflows（工作流）是 GitHub Actions 的核心概念之一。

它们是描述在代码仓库中自动化任务的一系列定义。工作流通常用 YAML 格式编写，并存储在仓库的 `.github/workflows` 目录中。

每个工作流文件定义了在特定**Event**发生时应该执行的一系列**steps**和**jobs**

### [Jobs](https://docs.github.com/en/actions/using-jobs)

工作流由一个或多个作业组成，每个作业可以并行或按顺序执行。每个作业运行在一个虚拟环境中，并包含多个步骤

- 定义一个runner （执行环境，比如 linux，mac，windows）
- 包含一个或多个Steps
- 支持并行或者串行执行
- 可以根据条件执行

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test

```


### Steps
每个Job包含多个步骤，每个步骤可以执行一个单独的操作

- 这些操作可以是运行命令、调用 Shell 脚本或使用预定义的 GitHub Action
- 可以用第三方库的action，也可以用github提供的action
- 按顺序执行
- 可以根据条件执行



例如，安装依赖和运行测试的步骤：

```yaml
steps:
  - name: Install dependencies
    run: npm install
  - name: Run tests
    run: npm test
```

如果需要执行多行Shell命令，可以使用管道符 `|` 连接多个命令：

```yaml
steps:
  - name: Run multiple commands
    run: |
 	    echo "First output"
	    echo "Second output"
```

### Events
[Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)
工作流的触发条件，指定在什么情况下工作流应该运行
- push
- pull_request
- release
- schedule
- workflow_dispatch
- ...


### [Actions](https://docs.github.com/en/actions/creating-actions)

Actions 是一个独立的任务，可以在工作流中执行。它们是可重用的，可以在多个仓库中使用

- 一个action可以包含多个步骤，可以把它看作执行复杂，频繁重复任务的应用程序
- 可以构建自己的 Actions，但也可以使用官方或社区 Actions

Command: `run` or `uses`

可以从这里找到更多的Actions [Marketplace](https://github.com/marketplace?type=actions)

#### 这里举个例子

使用 git 将代码从存储库克隆到runner上 这个可以作为一个action

如果要自己去写这个action，这是极其不必要的，这是非常常见的任务，GitHub团队已经创建了一个用于执行此操作的操作，可以在市场中找到

[Action-checkout](https://github.com/actions/checkout) 这个是官方提供的action，用于clone代码到runner

如果不使用官方的action，可以自己写一个action，然后发布到marketplace，供其他人使用，也就是造轮子
