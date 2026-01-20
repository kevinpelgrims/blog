export default {
	layout: "post.njk",
	eleventyComputed: {
		permalink: (data) => {
			const date = new Date(data.date);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			// Extract slug from filename (remove date prefix)
			const slug = data.page.fileSlug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
			return `/blog/${year}/${month}/${day}/${slug}/`;
		}
	}
};
