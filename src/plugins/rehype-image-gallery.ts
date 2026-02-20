import { visit } from 'unist-util-visit';

interface Node {
	type: string;
	tagName?: string;
	properties?: Record<string, any>;
	children?: Node[];
	value?: string;
}

interface Parent {
	children: Node[];
}

export default function rehypeImageGallery() {
	return (tree: Node) => {
		// 查找连续的图片或figure元素
		const imageGroups: { node: Node; index: number; parent: Parent }[][] = [];
		let currentGroup: { node: Node; index: number; parent: Parent }[] = [];

		visit(tree, 'element', (node: Node, index: number, parent: Parent | null) => {
			if (!parent) return;

			// 检查是否是图片或figure元素
			const isImage = node.tagName === 'img';
			const isFigure = node.tagName === 'figure' && node.children?.some((child: Node) => child.tagName === 'img');

			if (isImage || isFigure) {
				currentGroup.push({ node, index, parent });
			} else {
				if (currentGroup.length > 1) {
					imageGroups.push([...currentGroup]);
				}
				currentGroup = [];
			}
		});

		// 处理最后一组
		if (currentGroup.length > 1) {
			imageGroups.push([...currentGroup]);
		}

		// 为每组连续图片创建gallery
		imageGroups.forEach((group) => {
			// 计算布局（2列或3列）
			const columns = group.length === 2 ? 2 : Math.min(3, group.length);
			
			// 创建gallery容器
			const gallery: Node = {
				type: 'element',
				tagName: 'div',
				properties: {
					className: ['image-gallery', `columns-${columns}`],
				},
				children: [],
			};

			// 将图片添加到gallery
			group.forEach(({ node }) => {
				const galleryItem: Node = {
					type: 'element',
					tagName: 'div',
					properties: {
						className: ['gallery-item'],
					},
					children: [node],
				};
				gallery.children?.push(galleryItem);
			});

			// 替换第一个图片为gallery，并移除其他图片
			const firstItem = group[0];
			firstItem.parent.children[firstItem.index] = gallery;

			// 移除其他图片（从后往前移除避免索引混乱）
			for (let i = group.length - 1; i > 0; i--) {
				const item = group[i];
				item.parent.children.splice(item.index, 1);
			}
		});
	};
}
