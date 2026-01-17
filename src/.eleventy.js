export default async function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy({"./public/": "/"});

  // Collection for posts (sorted by date descending)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("blog/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Date filter
  eleventyConfig.addFilter("dateDisplay", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  });

  // Shortcodes
  eleventyConfig.addShortcode("figure", (url, description, width) => {
    const widthString = width ? `width="${width}"` : "";
  	return `<figure>
              <img src="${url}" alt="${description}" ${widthString}>
              <figcaption>${description}</figcaption>
            </figure>`;
  });

  // Content configuration
	return {
    dir: {
      input: "content",
      includes: "../_includes", // (relative to `input`)
      layouts: "../_includes/layouts", // (relative to `input`)
      data: "../_data", // (relative to `input`)
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
	};
};
