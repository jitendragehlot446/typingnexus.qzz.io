import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context: any) {
	const posts = await getCollection('blog');
	const sortedPosts = posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
	);
	
	const baseUrl = context.site ? context.site.origin : 'https://typingnexus.qzz.io';
	
	let content = `# ${SITE_TITLE}\n\n`;
	content += `> ${SITE_DESCRIPTION}\n\n`;
	
	content += `## Main Pages\n`;
	content += `- [Home](${baseUrl}/) - The official blog of Typing Nexus with guides for Indian government typing examinations.\n`;
	content += `- [Blog](${baseUrl}/blog) - Articles and guidelines for different typing exams.\n`;
	content += `- [About](${baseUrl}/about) - About Typing Nexus blog and the free typing practice simulator.\n\n`;
	
	content += `## Exam Guides & Typing Rules\n`;
	sortedPosts.forEach((post) => {
		content += `- [${post.data.title}](${baseUrl}/blog/${post.id}/) - ${post.data.description}\n`;
	});
	
	return new Response(content, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
		},
	});
}
