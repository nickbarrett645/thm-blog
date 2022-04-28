module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css/style.css");
    eleventyConfig.addPassthroughCopy("./src/css/post.css");

    eleventyConfig.addFilter('cleanDate', (dateString) => {
        dateObj = new Date(dateString);
        return DateTime.fromJSDate(dateObj).toFormate('dd-mm-yyyy');

    })

    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
