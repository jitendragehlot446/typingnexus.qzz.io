import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context: any) {
	const posts = await getCollection('blog');
	const sortedPosts = posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
	);
	
	const baseUrl = context.site ? context.site.origin : 'https://blog.typingnexus.in';
	
	let content = `# ${SITE_TITLE}\n\n`;
	content += `> ${SITE_DESCRIPTION}\n\n`;
	content += `Typing Nexus provides comprehensive speed calculation rules, backspace restrictions, duration limits, and keyboard font layouts (Mangal, Remington Gail, Inscript, KrutiDev) for all major Indian government examinations.\n\n`;
	
	content += `## Core Resources\n`;
	content += `- [Home](${baseUrl}/) - Official blog homepage covering latest exam rules and speed requirements.\n`;
	content += `- [All Articles](${baseUrl}/blog) - Searchable directory of 99+ exam typing test guidelines.\n`;
	content += `- [Guides & Layouts](${baseUrl}/guides) - Deep dives on Mangal font, Remington Gail, and KrutiDev typing rules.\n`;
	content += `- [About Typing Nexus](${baseUrl}/about) - About the platform, purpose, and practice simulator.\n`;
	content += `- [Full Knowledge Base (LLMs Full)](${baseUrl}/llms-full.txt) - Complete uncompressed text of all 99+ articles.\n\n`;
	
	content += `## Interactive Practice Simulators\n`;
	content += `- [Typing Nexus Practice Platform](https://typingnexus.in/) - Full online simulator for SSC, Railway, Court, and Police typing exams.\n`;
	content += `- [Hindi Remington Gail Practice](https://typingnexus.in/practice-exams) - Mangal font typing practice with Remington Gail layout.\n`;
	content += `- [English Typing Test Simulator](https://typingnexus.in/practice) - 10/15-minute speed and accuracy test with standard KDPH/WPM evaluation.\n\n`;

	// Categorize Posts
	const categories: Record<string, typeof sortedPosts> = {
		'Central & SSC Typing Examinations': [],
		'High Courts & Judicial Service Typing Tests': [],
		'Police & Defense Forces Typing Tests': [],
		'State SSC & PSC Typing Examinations': [],
		'Computer Proficiency & Efficiency Tests (Word & Excel)': [],
		'Hindi Typing Layouts & General Guides': []
	};

	sortedPosts.forEach((post) => {
		const id = post.id.toLowerCase();
		const title = post.data.title.toLowerCase();
		if (id.includes('efficiency') || id.includes('word-excel') || title.includes('efficiency')) {
			categories['Computer Proficiency & Efficiency Tests (Word & Excel)'].push(post);
		} else if (id.includes('ssc') || id.includes('rrb') || id.includes('aiims') || id.includes('nta') || id.includes('epfo') || id.includes('csir') || id.includes('dda') || id.includes('emrs') || id.includes('supreme-court') || id.includes('chandigarh') || id.includes('delhi-jal')) {
			categories['Central & SSC Typing Examinations'].push(post);
		} else if (id.includes('court') || id.includes('ro-aro') || id.includes('judicial') || id.includes('jhc')) {
			categories['High Courts & Judicial Service Typing Tests'].push(post);
		} else if (id.includes('police') || id.includes('army') || id.includes('bsf') || id.includes('air-force') || id.includes('forces') || id.includes('agniveer') || id.includes('hcm') || id.includes('asi')) {
			categories['Police & Defense Forces Typing Tests'].push(post);
		} else if (id.includes('mangal') || id.includes('remington') || id.includes('inscript') || id.includes('marathon') || id.includes('layout')) {
			categories['Hindi Typing Layouts & General Guides'].push(post);
		} else {
			categories['State SSC & PSC Typing Examinations'].push(post);
		}
	});

	for (const [categoryName, catPosts] of Object.entries(categories)) {
		if (catPosts.length > 0) {
			content += `## ${categoryName}\n`;
			catPosts.forEach((post) => {
				content += `- [${post.data.title}](${baseUrl}/blog/${post.id}/) - ${post.data.description}\n`;
			});
			content += `\n`;
		}
	}

	return new Response(content, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
		},
	});
}

