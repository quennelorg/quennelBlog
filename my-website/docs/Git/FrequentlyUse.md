---
sidebar_position: 1
---

# Frequently Use Link

## QA

Q: .gitignore放入了env，但是还是在commit tracking中
A: https://stackoverflow.com/questions/38983153/git-is-not-respecting-gitignore-instruction-to-ignore-env-files

Use git rm:
If you have already added the files to be tracked, you need to remove them from tracking:
```
git rm env.local --cached
git rm env.staging --cached
git commit -m "Stopped tracking env.local, and env.staging"
Now you should be able to clone your branch without those files being tracked.
```
Note: Keep in mind that the contents of those files are in your history, and if they did contain sensitive data, then you need to [completely remove](https://www.ducea.com/2012/02/07/howto-completely-remove-a-file-from-git-history/) that from history before putting it out there.