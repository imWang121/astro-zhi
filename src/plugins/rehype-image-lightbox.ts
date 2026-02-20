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

function rehypeImageLightbox() {
	return (tree: Node) => {
		visit(tree, 'element', (node: Node, nodeIndex: number, parent: Parent) => {
			if (node.tagName === 'img' && node.properties) {
				const props = node.properties;
				const alt = props.alt;
				const wrapperChildren: Node[] = [node];
				
				if (alt && (typeof alt === 'string' && alt.trim() || Array.isArray(alt))) {
					const altText = Array.isArray(alt) ? alt.join('') : String(alt);
					if (altText.trim()) {
						const caption: Node = {
							type: 'element',
							tagName: 'div',
							properties: {
								className: ['lightbox-image-caption']
							},
							children: [{ type: 'text', value: altText.trim() }]
						};
						wrapperChildren.push(caption);
					}
				}

				const wrapper: Node = {
					type: 'element',
					tagName: 'div',
					properties: {
						className: ['lightbox-image-wrapper']
					},
					children: wrapperChildren
				};

				if (parent && parent.children) {
					const index = parent.children.indexOf(node);
					if (index !== -1) {
						parent.children[index] = wrapper;
					}
				}
			}
		});

		// 在文档末尾添加灯箱脚本
		const scriptContent = `
			(function() {
				let lightboxModal = null;
				let currentIndex = 0;
				let images = [];

				function initLightbox() {
					images = [];
					document.querySelectorAll('.lightbox-image-wrapper').forEach((wrapper, index) => {
						const img = wrapper.querySelector('img');
						if (img) {
							images.push({
								src: img.src,
								alt: img.alt || '',
								caption: img.title || ''
							});

							wrapper.onclick = function() {
								openLightbox(index);
							};
						}
					});
				}

				function openLightbox(index) {
					currentIndex = index;
					createModal();
					document.body.style.overflow = 'hidden';
				}

				function closeLightbox() {
					if (lightboxModal) {
						lightboxModal.remove();
						lightboxModal = null;
					}
					document.body.style.overflow = 'auto';
				}

				function nextImage() {
					currentIndex = (currentIndex + 1) % images.length;
					updateImage();
				}

				function prevImage() {
					currentIndex = (currentIndex - 1 + images.length) % images.length;
					updateImage();
				}

				function createModal() {
					lightboxModal = document.createElement('div');
					lightboxModal.className = 'lightbox-modal';
					lightboxModal.onclick = closeLightbox;

					const content = document.createElement('div');
					content.className = 'lightbox-content';
					content.onclick = function(e) { e.stopPropagation(); };

					const prevBtn = document.createElement('button');
					prevBtn.className = 'lightbox-nav lightbox-prev';
					prevBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
					prevBtn.onclick = function(e) { e.stopPropagation(); prevImage(); };

					const nextBtn = document.createElement('button');
					nextBtn.className = 'lightbox-nav lightbox-next';
					nextBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
					nextBtn.onclick = function(e) { e.stopPropagation(); nextImage(); };

					const imgContainer = document.createElement('div');
					imgContainer.className = 'lightbox-image-container';

					const img = document.createElement('img');
					img.src = images[currentIndex].src;
					img.alt = images[currentIndex].alt;
					imgContainer.appendChild(img);

					const caption = document.createElement('div');
					caption.className = 'lightbox-modal-caption';
					caption.textContent = images[currentIndex].caption || '';

					const counter = document.createElement('div');
					counter.className = 'lightbox-counter';
					counter.textContent = (currentIndex + 1) + ' / ' + images.length;

					content.appendChild(imgContainer);
					content.appendChild(caption);
					lightboxModal.appendChild(prevBtn);
					lightboxModal.appendChild(nextBtn);
					lightboxModal.appendChild(content);
					lightboxModal.appendChild(counter);

					document.body.appendChild(lightboxModal);
				}

				function updateImage() {
					if (!lightboxModal) return;

					const img = lightboxModal.querySelector('.lightbox-image-container img');
					const caption = lightboxModal.querySelector('.lightbox-modal-caption');
					const counter = lightboxModal.querySelector('.lightbox-counter');

					if (img) {
						img.src = images[currentIndex].src;
						img.alt = images[currentIndex].alt;
					}

					if (caption) {
						caption.textContent = images[currentIndex].caption || '';
					}

					if (counter) {
						counter.textContent = (currentIndex + 1) + ' / ' + images.length;
					}
				}

				document.addEventListener('keydown', function(e) {
					if (!lightboxModal) return;

					switch (e.key) {
						case 'Escape':
							closeLightbox();
							break;
						case 'ArrowRight':
							nextImage();
							break;
						case 'ArrowLeft':
							prevImage();
							break;
					}
				});

				if (document.readyState === 'loading') {
					document.addEventListener('DOMContentLoaded', initLightbox);
				} else {
					initLightbox();
				}
			})();
		`;

		const scriptNode: Node = {
			type: 'element',
			tagName: 'script',
			properties: {},
			children: [{ type: 'text', value: scriptContent }]
		};

		if (tree.type === 'root' && tree.children) {
			tree.children.push(scriptNode);
		}
	};
}

export default rehypeImageLightbox;