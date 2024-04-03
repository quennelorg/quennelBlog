---
slug: projectSetupByFrontEnd 
title: How to setup a normal project
authors: quennel
tags: [project, setup, pre-commit, husky, pre-push]
---

## This is a how to initial project blog
**frontend view**   

Every time you start a project, many default configurations or libraries need to be configured. Here is a basic study of these **default configuration**

## Common Setting
### .gitignore
You can read this document to understand [Ignoring files](https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files)

**build文件 和 node module**No need to be tracked
**Some configuration files for running the project locally**No need to be tracked
**Personal data**No need to be tracked
**private data**No need to be tracked

### prettier
[prettier](https://prettier.io/)

This is a format specification belonging to the project. Each project has a format that each project is accustomed to, so an automatic format configuration is very necessary, so that in the case of multiple people cooperating, all codes in the project can be guaranteed. The format is the same

### Git hook
[githooks](https://git-scm.com/docs/githooks)
- The default directory is usually in `$GIT_DIR/hooks/* (or git config core.hooksPath/*)` 
- Generally, when committing or pushing, the entire project will be tested to ensure that changes will not affect other functions, which can ensure software quality to a certain extent.
- You can also re-standardize the format of the entire project during this process.
- There are **client** and **server**, corresponding to different types of hooks. Detailed descriptions can be found in[Front-end Git-Hooks engineering practice ](https://www.cnblogs.com/dtux/p/16419271.html)
#### Commonly used **pre-commit**
This hook is called by git-commit[1] and can be bypassed using the --no-verify option. It takes no parameters and is called before getting the suggested commit log message and making the commit.
Exiting from this script with a non-zero status causes the git commit command to abort before the commit is created.
The default pre-commit hook, when enabled, catches the introduction of lines with trailing spaces and aborts the commit when such a line is found.
#### Commonly used **commit-msg**
This hook receives one parameter, the path to a temporary file that holds the current commit information. If this hook script exits with a non-zero value, Git will abandon the commit, so it can be used to verify project status or commit information before the commit goes through.
#### Commonly used **pre-push**
This hook is called by git-push and can be used to prevent push from happening and run tests before pushing. It can be bypassed with --no-verify.
If this hook exits with a non-zero status, git push will abort without pushing anything. Information about why the push was rejected can be sent to the user by writing to standard error.
#### [husky](https://typicode.github.io/husky/)
[huskyGithub](https://github.com/typicode/husky)
- You can expose pre-commit and pre-push hooks to the outside. You can set a hook for the entire project and share the same hook when multiple people collaborate.
- When committing or pushing, you can detect commit messages, run tests, and detect code. You only need to write the configuration in .husky. Husky triggers all git hook scripts. You do not need to write shell scripts in .git/hooks yourself.
## Special Setting