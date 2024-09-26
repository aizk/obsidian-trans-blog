# What is Obsidian Trans to Blog?

转换 Obsidian 内容格式到主流静态博客格式，作为中间层解耦 Obsidian 和各大 Blog 技术。

例如 Obsidian 中的 `[[Wikilinks]]` 转换成 Markdown 中的 `[]()` 文件引用，如果链接的文档没发布，则去掉括号。

兼容主流静态博客格式：

- Obsidian to MDX
- Obsidian to Hugo? TODO
- Obsidian to XXX? 

# Why Design This?

为了解决以下问题，**提升效率**！

Obsidian 格式与 Markdown 格式并不完全兼容，如果在 Obsidian 写了一篇文章想要发布到 Blog 还需要做不少修改，得到一个 Blog 格式的文章，此时就需要维护两个地方的同一篇文章。

如果有很多文章，N 篇文章有更新，就需要同时更新 N 个地方，即麻烦，又低效，还烦人，还不一定能全部更新到。

这就是典型的同步问题，如何解决这个问题呢？

1. 保证数据源只有一份
2. 通过工具将数据源转换到需要使用的格式

而 Obsidian Trans to Blog 就是这个工具。

# More Info

https://www.cd67.com/post/obsidian/trans/blog
