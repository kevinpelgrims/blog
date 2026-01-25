import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { IdAttributePlugin } from "@11ty/eleventy";
import feedPlugin from "@11ty/eleventy-plugin-rss";

export default async function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(IdAttributePlugin);
  eleventyConfig.addPlugin(feedPlugin);

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy({"./public/": "/"});

  // Collection for posts (sorted by date descending)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/blog/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Collection for all unique tags with post counts
  eleventyConfig.addCollection("tags", function(collectionApi) {
    const tagMap = new Map();
    collectionApi.getFilteredByGlob("content/blog/*.md").forEach((post) => {
      if (post.data.tags) {
        post.data.tags.forEach((tag) => {
          tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
        });
      }
    });
    return Array.from(tagMap, ([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  // Collection for projects
  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/projects/*.md");
  });

  // Date filter
  eleventyConfig.addFilter("dateDisplay", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  });

  // ISO date filter (for sitemap)
  eleventyConfig.addFilter("dateToIso", function(date) {
    return new Date(date).toISOString();
  });

  // Excerpt filter (strips HTML and truncates)
  eleventyConfig.addFilter("excerpt", function(content, length = 200) {
    if (!content) return "";
    // Strip HTML tags
    const text = content.replace(/<[^>]+>/g, "");
    // Collapse whitespace
    const clean = text.replace(/\s+/g, " ").trim();
    // Truncate at word boundary
    if (clean.length <= length) return clean;
    const truncated = clean.substring(0, length);
    const lastSpace = truncated.lastIndexOf(" ");
    return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + "…";
  });

  // Shortcodes
  eleventyConfig.addShortcode("figure", (url, description, width) => {
    const widthString = width ? `width="${width}"` : "";
  	return `<figure>
              <img src="${url}" alt="${description}" ${widthString}>
              <figcaption>${description}</figcaption>
            </figure>`;
  });

  // Add lastBuildDate
  eleventyConfig.addGlobalData("lastBuildDate", () => {
    return new Date();
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
