---
sidebar_position: 2
---

# QA


[Common MDX problems](https://docusaurus.io/blog/preparing-your-site-for-docusaurus-v3#common-mdx-problems)
## md file can not have special character
like  `<sa>`, `()`

```md
:::danger Take care

Unexpected character @ (U+0040) in name, expected a name character such as letters, digits, $, or _; whitespace before attributes; or the end of the tag (note: to create a link in MDX, use [text](url))


Unexpected character 5 (U+0035) before name, expected a character that can start a name, such as a letter, $, or _

Expected a closing tag for <T> (1:6-1:9) before the end of paragraph end-tag-mismatch mdast-util-mdx-jsx

Expected a closing tag for <YOUR_MINOR_VERSION> (134:19-134:39) before the end of paragraph
:::
```


##  Error: Docusaurus found broken links!
It looks like some of the broken links we found appear in many pages of your site.

有时候把文档移动了位置，然后在其他地方所使用到的链接是错误的，如果build的话，就成了 broken links