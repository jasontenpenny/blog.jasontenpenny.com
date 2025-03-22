export default function(eleventyConfig) {

    // sets default layout
    eleventyConfig.addGlobalData('layout', 'default.html');

}

export const config = {
    dir: {
      // These are both relative to your input directory!
      includes: "_includes",
      layouts: "_layouts",
    }
  }
