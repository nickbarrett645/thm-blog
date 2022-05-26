module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css/style.css");
    eleventyConfig.addPassthroughCopy("./src/css/post.css");
    eleventyConfig.addWatchTarget("./src/css/");

    eleventyConfig.addFilter('cleanDate', (dateString) => {
        dateObj = new Date(dateString);
        return DateTime.fromJSDate(dateObj).toFormate('dd-mm-yyyy');

    });

    eleventyConfig.addCollection('daily', (collection) => {
        const coll = collection.getFilteredByTag('daily');
      
        for(let i = 0; i < coll.length ; i++) {
          const prevPost = coll[i-1];
          const nextPost = coll[i + 1];
      
          coll[i].data['prevPost'] = prevPost;
          coll[i].data['nextPost'] = nextPost;
        }
      
        return coll;
    });

    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
