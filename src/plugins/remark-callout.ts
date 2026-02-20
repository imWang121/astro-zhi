import { visit } from 'unist-util-visit';

const VALID_TYPES = ['note', 'info', 'warning', 'success', 'error', 'tip'];

export default function remarkCallout() {
	return (tree: any) => {
		visit(tree, 'containerDirective', (node) => {
			let type = node.name;

			if (!VALID_TYPES.includes(type)) {
				type = 'note';
			}

			const title = node.attributes?.title || node.attributes?.label || null;

			const data = node.data || (node.data = {});

			data.hName = 'div';
			data.hProperties = {
				className: ['callout', type],
			};

			if (title) {
				const titleNode = {
					type: 'element',
					data: {
						hName: 'div',
						hProperties: {
							className: ['callout-title'],
						},
					},
					children: [{ type: 'text', value: title }],
				};
				node.children.unshift(titleNode as any);
			}
		});
	};
}
