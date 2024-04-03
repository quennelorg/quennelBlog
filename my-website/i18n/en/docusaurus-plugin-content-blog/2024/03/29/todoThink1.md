---
slug: todoThink1
title: Thinking for create todo
authors: quennel
tags: [todo, Thinking]
---

## At first
When I started working on the todo function, I didn’t think about what content it would be made into, nor what the development direction of this function would be.
The initial idea is that this blog website needs a place to record what has been done, what needs to be done, what is being done, etc.

## Now
### Thoughts
The development of todo has not gone through systematic development. It is just a matter of doing it as soon as the brain is hot and doing whatever comes to mind. This is actually not agile, let alone serious software development.
Although I deliberately applied **development thinking** when doing it, I found out when I looked back that this was not a coherent process. Generally speaking, there is a lot of room for improvement in the entire development progress and process.
## Project Flow
Go to YouTube or related websites to find resources about todo react. Here are some references that have been used in the development of this function:
- [React JS Todo List App using Local Storage I React JS Beginner Project](https://www.youtube.com/watch?v=fLxm6qiJYzg)
- [Build a Todo App with React.js | Beginner React Project using hooks](https://www.youtube.com/watch?v=QdTHUv79EZc)
## Start feature development
Get an input box and submit button; enter the content, use useState to save the characters in the input box, and then click the submit button to output the characters.
- At this time, I will subconsciously create a model to store the task type. In addition to id and name, I will also think about priorities in the future, and then I will think about whether I can use the mvvm framework to organize this function.
- I encountered a problem at this time, how to define type in useState. Here is a reference [Set types on useState React Hook with TypeScript](https://stackoverflow.com/questions/53650468/set-types-on-usestate- react-hook-with-typescript)
- But in fact, I found that ** many times I will think of many ideas or find many bugs in the process of doing it. At this time, it is very confusing to put aside the current need to implement and come up with a sudden idea. If this idea can It’s okay to finish it quickly, but if the idea takes a lot of time and cannot be completed at once, it will disrupt the previous plan**
- This problem has been throughout the entire function development. The current method I think of is to write down the idea first. **If it can be implemented quickly or the idea is strongly related to what you are doing now, put this idea at the highest priority. If the idea takes more time or is not related to what you are doing now, record it. **
- The initial idea was to save the data in [docusaurus.config](https://docusaurus.io/zh-CN/docs/configuration), but in practice it was found that this config is static and cannot be dynamic. config is only suitable for saving configuration-related data and cannot be added, deleted, or modified at any time.
- Regarding the idea of ​​config, you can actually refer to nacos to read the dynamic config, but this is a card with a very low priority. First, quickly develop basic functions quickly, and then decide whether to open these cards based on actual needs. .
- Talking about cards, you can actually turn your ideas into the form of cards, that is, reconstruct the todo page. **In addition to daily tasks, you can turn MD tasks into the form of card UI. **
### Development mid-end
The input box and submit button debugging is completed, and localStorage is used to temporarily store data, and Alert is added.
- After developing and debugging the input box and input function, in addition to the submit function of the submit button, I temporarily thought of the tip function of Alert, so I put down the use of localStorage. At that time, I thought that if I use localStorage, it will be difficult to debug (maybe because I feel unfamiliar) The technology will take a lot of time to use and cannot be used quickly)
- The Alert function also requires an Alert model to classify Alerts of different levels. At this time, the importance of the model can be seen, and the Alert level and task type are mapped, using a new method [record] (https //zhuanlan.zhihu.com/p/356662885), thus practicing a new implementation method
- When developing the Alert function, I was struggling with UI, so I started researching mui. Since I had used mui+react before, I planned to use mui in docusaurus.
- That is, the big framework of the entire project is still Docusaurus. For some special functions, mui is used for rendering. Reference document: [How to use Material UI with Docusaurus](https://webreaper.dev/posts/material-ui-theme -with-docusaurus/)
- When researching docusaurus, I found that the official documentation has many supported functions and plug-ins, such as theme-related [config](https://docusaurus.io/docs/api/themes/configuration) and also provides [competing products] Introduction to the characteristics of the website](https://docusaurus.io/docs#comparison-with-other-tools)
- Thoughts: **When learning a new technology in the future, first understand the official documents and read them in general to see what impresses you**
### The third stage of development (addition, deletion, checking and modification, data management, UI optimization)
Prepare to use viewModel to manage data operations. ViewController is responsible for useState, and view is only responsible for UI. Just pass the method to view.
- I have studied the implementation of mui before, so I decided to use mui to implement the entire task list. The implementation process is to extract the view of the list, and then use prop to give the data and methods to the sub-view.
- Since the page has a lot of state, including taskName, editId, isEditing, list, alert, etc., the viewController will be very large. At this time, you need to quickly implement these functions first, and then optimize them. Always remember to submit in small steps. , continuous reconstruction**
- The implementation of viewModel is first put on another side, and is ready to be implemented with reducer. First, the addition, deletion, checking and modification of tasks are implemented, and these functions require constant debugging.
- Implement the priority of the task. At this time, the priority will be related to the various functions of addition, deletion, and modification.
- Reconstruct the task's UI and then put this feature into mdx
- Fix bug, use docusaurus dark config to be compatible with mui [use-color-mode](https://docusaurus.io/docs/next/api/themes/configuration#use-color-mode)
- Reconstruct todoList, gradually implement single responsibility system for specific functions and extract multiple similar functions into a community, such as different logics for task-related operations based on operations.
## Future
At this stage of development, release 0.1 is basically online.
Next goals:
- Practice design patterns and constantly practice refactoring
- Decided to use localStorage to implement basic data storage. If this stage is completed, it will be decided to use a database to store todos and deploy it to the cloud.
- Use reducers to manage data
- Added the ability to drag and drop todo tasks and change task priority
- When editing, if the content has not been updated, keep the original taskId.
