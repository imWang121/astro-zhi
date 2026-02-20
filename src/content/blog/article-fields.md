---
title: 文章字段说明
description: 介绍博客文章 frontmatter 支持的所有字段及其用法。
date: '2025-01-06'
abbrlink: article-fields
---

本文介绍博客文章 frontmatter 支持的所有字段及其用法。

## 必填字段

### title

文章标题，必填字段。

```yaml
title: 我的文章标题
```

### description

文章描述，用于 SEO 和文章列表展示，必填字段。

```yaml
description: 这是一篇关于某个主题的文章。
```

### date

文章发布日期，必填字段。支持多种日期格式：

```yaml
date: '2026-01-15'
date: 'Jan 15 2026'
date: '2026-01-15T10:30:00'
```

## 可选字段

### updatedDate

文章更新日期，可选字段。格式与 `date` 相同。

```yaml
updatedDate: '2026-02-20'
```

### heroImage

文章封面图片，可选字段。支持本地图片路径或远程 URL。

```yaml
heroImage: './cover.jpg'
heroImage: 'https://example.com/image.jpg'
```

### draft

是否为草稿，可选字段，默认为 `false`。设置为 `true` 时，文章不会在生产环境显示。

```yaml
draft: true
```

### abbrlink

文章短链接标识，可选字段。用于生成友好的 URL，如 `/blog/my-article/`。

```yaml
abbrlink: my-article
```

### badge

文章徽章标签，可选字段。显示在文章标题旁边，用于标记文章状态或类型。

```yaml
badge: Astro
badge: 新
badge: 推荐
```

### tags

文章标签，可选字段，默认为空数组。用于归档页面的标签分类。

```yaml
tags: ["Astro", "博客", "开发"]
tags: ["教程"]
```

### archive

是否在归档页面显示，可选字段，默认为 `true`。设置为 `false` 时，文章不会出现在归档页面。

```yaml
archive: false
```

## 完整示例

```yaml
---
title: 使用 Astro 构建博客
description: 一篇关于如何使用 Astro 构建个人博客的教程。
date: '2026-01-15'
updatedDate: '2026-02-20'
heroImage: './cover.jpg'
draft: false
abbrlink: build-blog-with-astro
badge: Astro
tags: ["Astro", "博客", "教程"]
archive: true
---
```

## 字段速查表

| 字段 | 必填 | 类型 | 默认值 | 说明 |
|------|------|------|--------|------|
| title | 是 | string | - | 文章标题 |
| description | 是 | string | - | 文章描述 |
| date | 是 | Date | - | 发布日期 |
| updatedDate | 否 | Date | - | 更新日期 |
| heroImage | 否 | Image | - | 封面图片 |
| draft | 否 | boolean | false | 是否草稿 |
| abbrlink | 否 | string | - | 短链接标识 |
| badge | 否 | string | - | 徽章标签 |
| tags | 否 | string[] | [] | 文章标签 |
| archive | 否 | boolean | true | 是否显示在归档页 |
