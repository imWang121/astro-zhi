---
title: 使用 Astro 构建现代 Web 应用
description: 创建快速、内容优先网站的全面指南
date: 2025-01-01
badge: Astro
abbrlink: building-with-astro
tags: ["Astro", "博客", "开发"]
draft: false
---

这是一个基于 Astro 构建的个人博客，追求简洁设计与快速性能。

## 技术选型

### 为什么选择 Astro？

在众多静态站点生成器中，我选择了 Astro，原因如下：

1. **零 JavaScript** — 默认不发送客户端 JavaScript，页面加载极快
2. **内容优先** — 天生适合博客、文档等内容型网站
3. **简洁语法** — `.astro` 文件类似 HTML，上手简单
4. **生态完善** — 丰富的集成和插件支持

> 最好的代码是不写代码。Astro 通过零 JS 输出践行这一理念。

## 项目结构

```
astro-i/
├── public/             # 静态资源
├── src/
│   ├── components/     # UI 组件
│   ├── content/        # 博客文章
│   ├── layouts/        # 页面布局
│   ├── pages/          # 路由页面
│   ├── plugins/        # 自定义插件
│   ├── styles/         # 全局样式
│   └── consts.ts       # 站点配置
└── astro.config.mjs    # Astro 配置
```

## 核心功能

### 内容管理

使用 Astro Content Collections 管理博客文章：

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().optional().default(false),
    abbrlink: z.string().optional(),
    badge: z.string().optional(),
  }),
});
```

### 自定义插件

项目包含多个自定义 rehype/remark 插件：

- **rehype-code-block** — 代码块增强（语言标签、行数、复制按钮）
- **rehype-image-lightbox** — 图片灯箱效果
- **rehype-image-gallery** — 图片画廊支持
- **remark-callout** — 提示框语法（`:::note`、`:::tip` 等）

### Markdown 增强

支持丰富的 Markdown 功能：

:::tip[提示框]
使用 `:::type[标题]` 语法创建美观的提示框。
:::

```markdown
:::note
无标题提示框
:::

:::warning[注意]
有标题提示框
:::
```

### 图片灯箱

点击任意图片即可全屏查看，支持导航切换：

![示例图片](https://picsum.photos/800/400?random=100)

### Pullquote 引语

使用 `blockquote.pullquote` 创建优雅的引语：

<blockquote class="pullquote">
  <p>保持热爱，无限进步。</p>
  <p>Arlo</p>
</blockquote>

## 站点配置

所有配置集中在 `src/consts.ts`：

```typescript
// 站点信息
export const SITE_TITLE = 'Astro Blog';
export const SITE_DESCRIPTION = 'Welcome to my website!';

// 个人介绍
export const INTRO = {
  greeting: "Hello, I'm",
  name: 'Arlo',
  tagline: '保持热爱，无限进步',
};

// 首页区块开关
export const HOME_SECTIONS = {
  intro: true,
  about: true,
  contact: true,
  projects: false,
  recentPosts: true,
};
```

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 部署

构建后可部署到任何静态托管平台：

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## 总结

这个博客项目展示了 Astro 的核心优势：简洁、快速、灵活。通过自定义插件和样式，打造了一个功能完善、体验流畅的个人博客。

---

*感谢 Astro 团队提供如此优秀的框架。*
