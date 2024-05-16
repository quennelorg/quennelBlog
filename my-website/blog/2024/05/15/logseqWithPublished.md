---
slug: logseqPublished
title: 如何部署Logseq
authors: quennel
tags: [DesignModel, Logseq, Published, github page]
date: 2024-05-15T14:21
---

## [Logseq](/quennelBlog/blog/logseq)

### 确保这个文档是public
首先要确保logseq中所有的page是public

方案1:
![img.png](img.png)

方案2:
去这个页面 `config.edn`, 找到`publish`

![img_1.png](img_1.png)

![img_2.png](img_2.png)

增加这个`:publishing/all-pages-public? true`

### 方案一：本地编译成静态文件

点击Export graph
![img_3.png](img_3.png)

点击Export Public pages
![img_4.png](img_4.png)

这时候选中一个文件夹来保存编译完成的静态文件

生成的目录文件：
![img_5.png](img_5.png)

这时候就可以将这个文件夹push到github，然后在page设置中选中代码的分支
![img_6.png](img_6.png)

之后等一会github会自动部署，这样的部署是最基础的部署，不推荐这种部署方式，接下来我们用github action来定制我们的部署流程

静态文件已经编译完成后，无论是部署到vercel，或者其他的静态网页host都是可以
### 方案二：Github Action编译
这里我们引入 Github Action，有两种思路
- 一种是编写workflow负责编译，部署交给github默认分支gh-pages部署
- 一种是编写workflow负责编译+部署

#### workflow负责编译

仓库默认部署分支设置：
![img_7.png](img_7.png)

编译workflow [publish.yml](https://github.com/quennelorg/lifeLogseq/blob/main/.github/workflows/publish.yml)


