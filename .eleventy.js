const Image = require("@11ty/eleventy-img");


module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy('js');
    eleventyConfig.addPassthroughCopy('.nojekyll');

    eleventyConfig.addWatchTarget("./_src/sass/");

    eleventyConfig.addNunjucksAsyncShortcode("ResponsiveImage", async (src, alt) => {
        if (!alt) {
          throw new Error(`Missing \`alt\` on myImage from: ${src}`);
        }
    
        // let stats = await Image(src, {
        //   widths: [25, 320, 640, 960, 1200, 1800, 2400],
        //   formats: ["jpeg", "webp"],
        //   urlPath: "/img/",
        //   outputDir: "./_site/img/responsive/",
        // });

        return "testss"
    
        // let lowestSrc = stats["jpeg"][0];
    
        // const srcset = Object.keys(stats).reduce(
        //   (acc, format) => ({
        //     ...acc,
        //     [format]: stats[format].reduce(
        //       (_acc, curr) => `${_acc} ${curr.srcset} ,`,
        //       ""
        //     ),
        //   }),
        //   {}
        // );
    
        // const source = `<source type="image/webp" srcset="${srcset["webp"]}" >`;
    
        // const img = `<img
        //   loading="lazy"
        //   alt="${alt}"
        //   src="${lowestSrc.url}"
        //   sizes='(min-width: 1024px) 1024px, 100vw'
        //   srcset="${srcset["jpeg"]}"
        //   width="${lowestSrc.width}"
        //   height="${lowestSrc.height}">`;
    
        // return `<div class="image-wrapper"><picture> ${source} ${img} </picture></div>`;
      });



    eleventyConfig.addCollection("everything", function(collection) {
        let tagSet = new Set();
        collection.getAll().forEach(function(item) {
        if( "tags" in item.data ) {
            let tags = item.data.tags;
    
            tags = tags.filter(function(item) {
            switch(item) {
                // this list should match the `filter` list in tags.njk
                case "all":
                case "nav":
                case "post":
                case "posts":
                return false;
            }
    
            return true;
            });
    
            for (const tag of tags) {
            tagSet.add(tag);
            }
        }
        });
    
        // returning an array in addCollection works in Eleventy 0.5.3
        return [...tagSet];
    });


    return {
        passthroughFileCopy: true,
    };
};