// 全局数据文件
// 可以在任何地方使用 import 关键字导入此数据

// ========================================
// 站点基础配置
// ========================================

/** 站点标题，显示在浏览器标签页和页头 */
export const SITE_TITLE = '纸';

/** 站点描述，用于 SEO 和 meta 标签 */
export const SITE_DESCRIPTION = '纸，极简单栏博客主题';

/** GitHub 仓库地址，用于 Issue 反馈 */
export const GITHUB_REPO = 'https://github.com/imWang121/astro-zhi';

/** 站点起始年份，用于页脚版权信息 */
export const SITE_START_YEAR = 2025;

/**
 * 是否显示站点起始年份
 * true: 显示 "© 2025-2026"
 * false: 只显示 "© 2026"
 */
export const SHOW_START_YEAR = true;

/**
 * 主题模式配置
 * 'light': 浅色模式
 * 'dark': 暗色模式
 */
export type ThemeMode = 'light' | 'dark';

/**
 * 当前主题模式
 * 用户可在配置文件中选择浅色或暗色主题
 */
export const THEME_MODE: ThemeMode = 'dark';

// ========================================
// 首页区块配置
// ========================================

/**
 * 首页区块开关配置
 * 控制首页各区块的显示与隐藏
 * 设为 true 显示，false 隐藏
 */
export const HOME_SECTIONS = {
	/** 个人介绍区块（Hello, I'm Arlo） */
	intro: true,
	/** 关于我区块（个人简介和故事） */
	about: true,
	/** 联系方式区块（Email、GitHub 等） */
	contact: true,
	/** 项目区块（个人项目展示） */
	projects: true,
	/** 最近文章区块（最新博客文章） */
	recentPosts: true,
	/** 最近文章显示数量（仅在 recentPosts 为 true 时生效） */
	recentPostsCount: 5,
};

// ========================================
// 个人介绍配置
// ========================================

/**
 * 首页介绍模式
 * 'text': 显示文字介绍（INTRO 配置）
 * 'image': 显示图片（INTRO_IMAGE 配置）
 */
export type IntroMode = 'text' | 'image';

/**
 * 首页介绍图片接口
 * 定义图片模式的数据结构
 */
export interface IntroImageConfig {
	/** 图片路径 */
	src: string;
	/** 图片 alt 文本（用于无障碍访问） */
	alt: string;
	/** 可选的图片说明文字 */
	caption?: string;
}

/**
 * 首页介绍模式选择
 * 'text': 使用 INTRO 文字配置
 * 'image': 使用 INTRO_IMAGE 图片配置
 */
export const INTRO_MODE: IntroMode = 'text';

/**
 * 个人介绍接口
 * 定义介绍区块的数据结构
 */
export interface IntroConfig {
	/** 问候语（如 "Hello, I'm"） */
	greeting: string;
	/** 名字 */
	name: string;
	/** 标语或座右铭 */
	tagline: string;
}

/**
 * 个人介绍配置
 * 显示在首页顶部（INTRO_MODE 为 'text' 时生效）
 */
export const INTRO: IntroConfig = {
	greeting: '',
	name: 'zhi',
	tagline: '纸，极简单栏博客主题',
};

/**
 * 首页介绍图片配置
 * 显示在首页顶部（INTRO_MODE 为 'image' 时生效）
 */
export const INTRO_IMAGE: IntroImageConfig = {
	src: '/images/memo/demo-memo-01.webp',
	alt: '名人名言图片',
	caption: '',
};

// ========================================
// 关于我配置
// ========================================

/**
 * 关于我段落接口
 * 定义每个段落的数据结构
 */
export interface AboutParagraph {
	/** 段落内容，支持 HTML 标签 */
	content: string;
	/** 可选的注释标记 */
	notes?: {
		/** 需要包裹 note 类的文本 */
		text: string;
		/** 段落中的位置（用于替换） */
		position: string;
	}[];
}

/**
 * 关于我配置
 * 关于我区块的段落数组
 */
export const ABOUT_PARAGRAPHS: AboutParagraph[] = [
	{
		content: '包含 <a href="/blog/">随笔</a>、<a href="/archive/">归档</a> 与 <a href="/about/">关于</a>，使用与配置请见 <a href="' + GITHUB_REPO + '" target="_blank" rel="noopener noreferrer">README</a>。',
	},
	{
		content: '更多文章请访问 <a href="/archive/">归档</a> 或 <a href="/blog/">随笔</a>。',
	},
];

// ========================================
// 项目配置
// ========================================

/**
 * 项目接口
 * 定义项目卡片的数据结构
 */
export interface Project {
	/** 项目名称 */
	name: string;
	/** 项目描述 */
	description: string;
	/** 项目链接 */
	url: string;
	/** 项目封面图片路径 */
	image: string;
	/** 项目封面 alt 文本 */
	imageAlt?: string;
}

/**
 * 项目配置
 * 首页显示的项目数组
 */
export const PROJECTS: Project[] = [
	{
		name: 'zhi',
		description: '纸，极简单栏博客主题',
		url: 'https://github.com/imWang121/astro-zhi',
		image: '/projects/astro_zhi.webp',
		imageAlt: 'zhi',
	},
];

// ========================================
// 联系方式配置
// ========================================

/**
 * 联系方式接口
 * 定义联系方式的数据结构
 */
export interface ContactLink {
	/** 链接类型：'link' 为普通链接，'modal' 为弹窗触发器 */
	type: 'link' | 'modal';
	/** 联系方式的显示标签 */
	label: string;
	/** 普通链接的 URL（type 为 'link' 时必填） */
	href?: string;
	/** Remix Icon 图标类名（如 'ri-mail-line'） */
	icon?: string;
	/** 自定义图标图片路径（用于 modal 类型） */
	iconImg?: string;
	/** 链接 target 属性（如 '_blank' 在新标签页打开） */
	target?: string;
	/** 链接 rel 属性（如 'noopener' 用于安全） */
	rel?: string;
	/** 要触发的弹窗 ID（type 为 'modal' 时必填） */
	modalId?: string;
	/** 是否启用 */
	enabled?: boolean;
}

/**
 * 联系方式配置
 * 首页显示的联系方法数组
 * 支持普通链接和弹窗触发器两种类型
 * 设置 enabled: false 可隐藏某个联系方式
 */
export const CONTACT_LINKS: ContactLink[] = [
	{
		/** 元宝派联系方式（弹窗形式） */
		type: 'modal',
		label: '元宝派',
		iconImg: '/other/yuanbao-color.webp',
		modalId: 'yuanbaoModal',
		enabled: false,
	},
	{
		/** 微信公众号联系方式（弹窗形式） */
		type: 'modal',
		label: '微信公众号',
		icon: 'ri-wechat-fill',
		modalId: 'wechatModal',
		enabled: false,
	},
	{
		/** 电子邮件联系方式 */
		type: 'link',
		label: 'Email',
		href: 'mailto:your@email.com',
		icon: 'ri-mail-ai-line',
		enabled: true,
	},
	{
		/** GitHub 主页链接 */
		type: 'link',
		label: 'GitHub',
		href: 'https://github.com/imWang121',
		icon: 'ri-github-line',
		target: '_blank',
		rel: 'noopener',
		enabled: true,
	},
	{
		/** X (Twitter) 主页链接 */
		type: 'link',
		label: 'X',
		href: 'https://x.com/username',
		icon: 'ri-twitter-x-fill',
		target: '_blank',
		rel: 'noopener',
		enabled: false,
	},
	{
		/** Facebook 主页链接 */
		type: 'link',
		label: 'Facebook',
		href: 'https://facebook.com/username',
		icon: 'ri-meta-line',
		target: '_blank',
		rel: 'noopener',
		enabled: false,
	},
	{
		/** 抖音主页链接 */
		type: 'link',
		label: '抖音',
		href: 'https://www.douyin.com/user/xxx',
		icon: 'ri-tiktok-fill',
		target: '_blank',
		rel: 'noopener',
		enabled: false,
	},
	{
		/** Bilibili 主页链接 */
		type: 'link',
		label: 'Bilibili',
		href: 'https://space.bilibili.com/xxx',
		icon: 'ri-bilibili-line',
		target: '_blank',
		rel: 'noopener',
		enabled: false,
	},
	{
		/** 微博主页链接 */
		type: 'link',
		label: '微博',
		href: 'https://weibo.com/u/xxx',
		icon: 'ri-weibo-line',
		target: '_blank',
		rel: 'noopener',
		enabled: false,
	},
	{
		/** 知乎主页链接 */
		type: 'link',
		label: '知乎',
		href: 'https://www.zhihu.com/people/xxx',
		icon: 'ri-zhihu-line',
		target: '_blank',
		rel: 'noopener',
		enabled: false,
	},
	{
		/** 网易云音乐主页链接 */
		type: 'link',
		label: '网易云音乐',
		href: 'https://music.163.com/#/user/home?id=xxx',
		icon: 'ri-netease-cloud-music-line',
		target: '_blank',
		rel: 'noopener',
		enabled: false,
	},
	{
		/** 豆瓣主页链接 */
		type: 'link',
		label: '豆瓣',
		href: 'https://www.douban.com/people/xxx',
		icon: 'ri-douban-fill',
		target: '_blank',
		rel: 'noopener',
		enabled: false,
	},
	{
		/** RSS 订阅链接 */
		type: 'link',
		label: 'RSS',
		href: '/rss.xml',
		icon: 'ri-rss-line',
		enabled: true,
	},
];

/**
 * Remix Icon 图标参考
 * 图标预览：https://remixicon.com/
 *
 * 常用图标类名：
 * - ri-mail-line / ri-mail-fill          邮件
 * - ri-github-line / ri-github-fill       GitHub
 * - ri-twitter-x-line / ri-twitter-x-fill X (Twitter)
 * - ri-facebook-line / ri-facebook-fill   Facebook
 * - ri-tiktok-line / ri-tiktok-fill       TikTok/抖音
 * - ri-bilibili-line / ri-bilibili-fill   Bilibili
 * - ri-weibo-line / ri-weibo-fill         微博
 * - ri-zhihu-line / ri-zhihu-fill         知乎
 * - ri-netease-cloud-music-fill           网易云音乐
 * - ri-douban-line / ri-douban-fill       豆瓣
 * - ri-instagram-line / ri-instagram-fill Instagram
 * - ri-youtube-line / ri-youtube-fill     YouTube
 * - ri-linkedin-line / ri-linkedin-fill   LinkedIn
 * - ri-telegram-line / ri-telegram-fill   Telegram
 * - ri-wechat-line / ri-wechat-fill       微信
 * - ri-qq-line / ri-qq-fill               QQ
 * - ri-phone-line / ri-phone-fill         电话
 * - ri-home-line / ri-home-fill           主页
 * - ri-link-line / ri-link-fill           链接
 * - ri-rss-line / ri-rss-fill             RSS
 */

// ========================================
// 弹窗配置
// ========================================

/**
 * 弹窗配置接口
 * 定义弹窗的数据结构
 */
export interface ModalConfig {
	/** 弹窗唯一 ID（用于 JavaScript 定位） */
	id: string;
	/** 品牌图片路径（可选） */
	brandImg?: string;
	/** 品牌图片 alt 文本（用于无障碍访问） */
	brandAlt?: string;
	/** 品牌图片下方显示的描述文字 */
	description: string;
	/** 号码/代码字段的标签 */
	numberLabel: string;
	/** 号码/代码的实际值 */
	numberValue: string;
	/** 可选的二维码配置 */
	qrCode?: {
		/** 二维码图片路径 */
		img: string;
		/** 二维码 alt 文本（用于无障碍访问） */
		alt: string;
		/** 二维码下方的提示文字 */
		hint?: string;
	};
}

/**
 * 弹窗配置
 * 弹窗配置数组
 * 每个弹窗通过 modalId 与联系方式关联
 */
export const MODALS: ModalConfig[] = [
	{
		id: 'yuanbaoModal',
		brandImg: '/other/yuanbao-text.webp',
		brandAlt: '元宝',
		description: '在元宝App搜索派号加入',
		numberLabel: '派号',
		numberValue: 'XXX XXX XXX',
		qrCode: {
			img: '/other/yuanbao-qrcode.svg',
			alt: '元宝派二维码',
			hint: '扫码加入元宝派',
		},
	},
	{
		id: 'wechatModal',
		description: '关注公众号获取更多内容',
		numberLabel: '公众号',
		numberValue: 'YourPublicAccount',
		qrCode: {
			img: '/other/wechat-qrcode.svg',
			alt: '微信公众号二维码',
			hint: '扫码关注公众号',
		},
	},
];
