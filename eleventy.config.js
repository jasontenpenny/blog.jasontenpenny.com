import { InputPathToUrlTransformPlugin, IdAttributePlugin } from "@11ty/eleventy";
import { DateTime } from "luxon";
import markdownItAttrs from "markdown-it-attrs";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownItTaskCheckbox from "markdown-it-task-checkbox";
import markdownItFootnote from "markdown-it-footnote";

export default function(eleventyConfig) {

  // sets default layout
  eleventyConfig.addGlobalData('layout', 'post.html');

  // enables passthrough files in the following directories
  eleventyConfig.addPassthroughCopy("assets");

  // enables parsing of a post excerpt
  eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		// Eleventy custom option
		// The variable where the excerpt will be stored.
		excerpt_alias: "excerpt",
    excerpt_separator: "<!-- more -->"
  });

  // allows for rewriting relative links
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);


  // date formatting filters
  eleventyConfig.addFilter("postDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("DDD")
  });
  eleventyConfig.addFilter("hoverDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("DDD 'at' t")
  });

  // enables IdAttributePlugin to hyperlink headings
  eleventyConfig.addPlugin(IdAttributePlugin);

  // make tweaks to markdown processing
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItAttrs, {
    leftDelimiter: '{:',
    rightDelimiter: '}'
  }));
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItFootnote));
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItTaskCheckbox));

  eleventyConfig.addPlugin(syntaxHighlight, {
    preAttributes: {
        "data-language": function(context) {
            return context.language;
        }
    }
});

  // custom collection of Posts
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md");
  })

}

export const config = {
  dir: {
    // These are both relative to your input directory!
    includes: "_includes",
    layouts: "_layouts",
  }
}
