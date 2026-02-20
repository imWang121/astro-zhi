---
title: 'MDX 支持'
description: 'MDX 让你可以在 Markdown 中使用 JSX 组件。了解如何在博客文章中创建交互式和动态内容。'
date: '2025-01-03'
abbrlink: mdx-support
---

MDX 是组件时代的 Markdown。它让你可以在 Markdown 内容旁边编写 JSX 组件，实现丰富的交互体验。

## 什么是 MDX？

MDX 将 Markdown 的简洁性与 React 组件的强大功能结合在一起：

```mdx
# 我的文章

这是一些 **Markdown** 内容。

<CustomComponent prop="value" />

更多 Markdown 内容。
```

## 使用组件

你可以在 MDX 文件中导入和使用 Astro 组件：

```mdx
---
import MyComponent from '../components/MyComponent.astro';
---

<MyComponent title="你好" />
```

## 交互示例

这是一个嵌入交互内容的示例：

<div style="padding: 1.5rem; background: var(--color-gray-50); border-radius: 8px; margin: 1.5rem 0;">
  <p style="margin: 0; font-family: var(--font-serif); color: var(--color-gray-600);">
    这是一个内联样式的自定义 JSX 元素。你可以创建丰富的交互组件，
    并直接嵌入到内容中。
  </p>
</div>

## 何时使用 MDX

### 适合使用 MDX 的场景：

- 需要交互组件
- 想要嵌入数据可视化
- 创建带有代码演示的教程
- 特定文章需要自定义布局

### 适合使用 Markdown 的场景：

- 撰写简单的博客文章
- 内容主要是文字
- 想要最大程度的可移植性
- 偏好简洁性

## MDX 功能

### JSX 表达式

你可以使用 JavaScript 表达式：

<div style="font-family: var(--font-sans-serif); font-size: 0.875rem; color: var(--color-gray-500);">
  当前年份：{new Date().getFullYear()}
</div>

### 条件渲染

```mdx
{condition && <p>这只在条件为真时显示</p>}
```

### 数据映射

```mdx
{items.map((item) => (
  <li key={item.id}>{item.name}</li>
))}
```

## 创建自定义组件

在 `src/components/` 中创建组件：

```astro
---
// src/components/Callout.astro
interface Props {
  type?: 'info' | 'warning' | 'success';
}

const { type = 'info' } = Astro.props;
---

<div class:list={['callout', type]}>
  <slot />
</div>

<style>
  .callout {
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
  }
  .info { background: #e7f3ff; }
  .warning { background: #fff3e0; }
  .success { background: #e8f5e9; }
</style>
```

然后在 MDX 中使用：

```mdx
---
import Callout from '../components/Callout.astro';
---

<Callout type="info">
  这是一个信息提示框。
</Callout>
```

## 最佳实践

1. **保持组件简单** — 组件应该只做好一件事
2. **使用 Props 增加灵活性** — 让组件可复用
3. **为组件添加文档** — 为复杂逻辑添加注释
4. **测试响应式** — 确保组件在移动端正常工作

## 性能说明

MDX 组件在构建时编译，因此没有运行时开销。你的站点保持快速和静态。

---

MDX 为创建引人入胜的交互内容开辟了可能性。当你需要超出普通 Markdown 能力的功能时使用它！

查看 [Markdown 功能](/blog/markdown-features/) 文章了解标准 Markdown 语法。
