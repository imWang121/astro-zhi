import { visit } from 'unist-util-visit';

export default function rehypeCodeBlock() {
	return (tree: any) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName === 'pre' && node.children?.[0]?.tagName === 'code') {
				const codeNode = node.children[0];
				const lang = codeNode.properties?.className?.[0]?.replace('language-', '') || 'text';
				const codeContent = getCodeContent(codeNode);
				const lines = codeContent.split('\n').filter((l: string) => l.trim()).length;

				const langDisplay: Record<string, string> = {
					text: 'TEXT',
					javascript: 'JavaScript',
					typescript: 'TypeScript',
					html: 'HTML',
					css: 'CSS',
					json: 'JSON',
					markdown: 'Markdown',
					md: 'Markdown',
					bash: 'Bash',
					shell: 'Shell',
					python: 'Python',
					rust: 'Rust',
					go: 'Go',
					java: 'Java',
					cpp: 'C++',
					c: 'C',
					sql: 'SQL',
					yaml: 'YAML',
					xml: 'XML',
					svg: 'SVG',
					astro: 'Astro',
					vue: 'Vue',
					svelte: 'Svelte',
					react: 'React',
					jsx: 'JSX',
					tsx: 'TSX',
				};

				const displayLang = langDisplay[lang.toLowerCase()] || lang.toUpperCase();

				const wrapper = {
					type: 'element',
					tagName: 'div',
					properties: {
						className: ['code-block-wrapper'],
						dataCode: codeContent,
					},
					children: [
						{
							type: 'element',
							tagName: 'div',
							properties: { className: ['code-header'] },
							children: [
								{
									type: 'element',
									tagName: 'span',
									properties: { className: ['code-lang'] },
									children: [{ type: 'text', value: displayLang }],
								},
								{
									type: 'element',
									tagName: 'div',
									properties: { className: ['code-info'] },
									children: [
										{
											type: 'element',
											tagName: 'span',
											properties: { className: ['code-meta'] },
											children: [{ type: 'text', value: `UTF-8 · ${lines} Lines` }],
										},
										{
											type: 'element',
											tagName: 'button',
											properties: { className: ['code-copy'], dataCopy: true },
											children: [{ type: 'text', value: 'Copy' }],
										},
									],
								},
							],
						},
						node,
					],
				};

				parent.children[index] = wrapper;
			}
		});
	};
}

function getCodeContent(node: any): string {
	if (node.type === 'text') {
		return node.value;
	}
	if (node.children) {
		return node.children.map(getCodeContent).join('');
	}
	return '';
}
