import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context: any) {
	const posts = await getCollection('blog');
	const sortedPosts = posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
	);
	
	const baseUrl = context.site ? context.site.origin : 'https://typingnexus.qzz.io';
	
	let content = `# ${SITE_TITLE} - Full Content\n\n`;
	content += `> ${SITE_DESCRIPTION}\n\n`;
	content += `This file contains the complete content of all guides and articles on ${SITE_TITLE}.\n\n`;
	
	content += `## Table of Contents\n`;
	sortedPosts.forEach((post) => {
		content += `- [${post.data.title}](#${post.id})\n`;
	});
	content += `\n---\n\n`;
	
	sortedPosts.forEach((post) => {
		content += `<a id="${post.id}"></a>\n`;
		content += `# ${post.data.title}\n\n`;
		content += `- **URL**: ${baseUrl}/blog/${post.id}/\n`;
		content += `- **Published Date**: ${post.data.pubDate.toLocaleDateString('en-US')}\n`;
		content += `- **Description**: ${post.data.description}\n\n`;
		content += `${post.body}\n\n`;
		content += `\n---\n\n`;
	});
	
	return new Response(content, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
		},
	});
}
