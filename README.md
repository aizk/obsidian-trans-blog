# What is Obsidian Trans to Blog?

Convert Obsidian content format to mainstream static blog formats, acting as an intermediate layer to decouple Obsidian from various blog technologies.

For example, `[[Wikilinks]]` in Obsidian can be converted to `[]()` file references in Markdown. If the linked document is not published, the brackets are removed.

Compatible with mainstream static blog formats:

- Obsidian to MDX
- Obsidian to Hugo? TODO
- Obsidian to XXX?

# Why Design This?

To address the following issues and **improve efficiency**!

The Obsidian format is not fully compatible with the Markdown format. If you write an article in Obsidian and want to publish it on a blog, you need to make a lot of modifications to get a blog-formatted article. At this point, you need to maintain the same article in two places.

If you have many articles and N articles are updated, you need to update N places simultaneously, which is troublesome, inefficient, annoying, and not guaranteed to be fully updated.

This is a typical synchronization problem. How to solve this problem?

1. Ensure there is only one data source.
2. Use a tool to convert the data source to the required format.

And Obsidian Trans to Blog is this tool.

# More Info

https://www.cd67.com/post/obsidian/trans/blog
