// add halftone effect to images ????
// style mobile menu
// finish print css cv
// make print css

const Image = require("@11ty/eleventy-img");
const lodash = require("lodash");
const fs = require('fs');
const path = require("path");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

/**
 * Get all unique key values from a collection
 *
 * @param {Array} collectionArray - collection to loop through
 * @param {String} key - key to get values from
 */
 function getAllKeyValues(collectionArray, key) {
    // get all values from collection
    let allValues = collectionArray.map((item) => {
      let values = item.data[key] ? item.data[key] : [];
      return values;
    });
  
    // flatten values array
    allValues = lodash.flattenDeep(allValues);
    // to lowercase
    allValues = allValues.map((item) => item.toLowerCase());
    // remove duplicates
    allValues = [...new Set(allValues)];
    // order alphabetically
    allValues = allValues.sort(function (a, b) {
      return a.localeCompare(b, "en", { sensitivity: "base" });
    });
    // return
    return allValues;
}

function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\(|\)/g, '') // Remove parentheses
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

async function makeSlug(s){
    console.log( "slugify: " + slugify(s));
    return slugify(s);
}

async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
      widths: [600, 1900],
      formats: ["avif", "webp", "jpeg"],
      outputDir: "_site/img",
    });
  
    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };
  
    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
  }

async function imageURL(src){
    let stats = await Image(src, {
        widths: [600],
        formats: ["jpeg"],
        outputDir: "_site/img",
    });
    return stats.jpeg[0].outputPath;
}

async function featuredImage(src, alt){
    let result = src.replace("./", "src/");

    if(result.charAt(0) === "/"){
        result = result.substring(1, result.length);
        result = "src/" + result;
    }

    let metadata = await Image(result, {
        widths: [600, 1900],
        formats: ["avif", "webp", "jpeg"],
        outputDir: "_site/img",
      });

      return `<a href="${metadata.jpeg[1].url}" 
      class="lightbox"
      data-pswp-width="${metadata.jpeg[1].width}" 
      data-pswp-height="${metadata.jpeg[1].height}" 
      data-pswp-srcset="${metadata.avif[1].url} 1x"
      target="_blank">
          <picture>
              <source type="${metadata.avif[1].sourceType}" srcset="${metadata.avif[1].url}" alt=${alt}>
              <source type="${metadata.webp[1].sourceType}" srcset="${metadata.webp[1].url}" alt=${alt}>
              <img
                  src="${metadata.jpeg[1].url}"
                  width="${metadata.jpeg[1].width}"
                  height="${metadata.jpeg[1].height}"
                  loading="lazy"
                  decoding="async"
                  alt=${alt}>
          </picture>
      </a>`;
}

async function supportImage(src){
    let result = src.replace("./", "");

    if(result.charAt(0) === "/"){
        result = result.substring(1, result.length);
        result = "src/" + result;
    }

    let metadata = await Image(result, {
        widths: [600, 1900],
        formats: ["avif", "webp", "jpeg"],
        outputDir: "_site/img",
    });

    // return JSON.stringify(metadata);

    // todo: make lightbox work with advanced image formates
    return `<a href="${metadata.jpeg[1].url}" 
        class="lightbox"
        data-pswp-width="${metadata.jpeg[1].width}" 
        data-pswp-height="${metadata.jpeg[1].height}" 
        data-pswp-srcset=""
        target="_blank">
            <picture>
                <source type="${metadata.avif[0].sourceType}" srcset="${metadata.avif[0].url}" >
                <source type="${metadata.webp[0].sourceType}" srcset="${metadata.webp[0].url}" >
                <img
                    src="${metadata.jpeg[0].url}"
                    width="${metadata.jpeg[0].width}"
                    height="${metadata.jpeg[0].height}"
                    loading="lazy"
                    decoding="async">
            </picture>
        </a>`;
}

async function homepageImage(src){

    let result = src.replace("./", "");

    if(result.charAt(0) === "/"){
        result = result.substring(1, result.length);
        result = "src/" + result;
    }

    let metadata = await Image(result, {
        widths: [200, 1900],
        formats: ["avif", "webp", "jpeg"],
        outputDir: "_site/img",
    });
    
    let lowsrc = metadata.jpeg[0];
    let highsrc = metadata.jpeg[metadata.jpeg.length - 1];
    
    return `<picture>
        ${Object.values(metadata).map(imageFormat => {
          return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat[0].url}" >`;
        }).join("\n")}
          <img
            src="${lowsrc.url}"
            width="${highsrc.width}"
            height="${highsrc.height}"
            loading="lazy"
            decoding="async">
            <span class="lightbox" data-lightroom-image="${metadata.jpeg[1].url}" data-lightroom-width="${metadata.jpeg[1].width}" data-lightroom-height="${metadata.jpeg[1].height}" data-lightroom-alt="test"></span>
    </picture>`;
}

async function iconsImages(link){

        let metadata = await Image(link, {
            widths: [48, 72, 96, 144, 168, 192],
            formats: ["png"],
            outputDir: "_site/img",
        });

        return `[${Object.values(metadata.png).map((icn, i) => {
                return `{ "src": "${icn.url}", "sizes": "${icn.height}x${icn.width}", "type": "${icn.sourceType}"} ${metadata.png.length  === i + 1 ? "" : ","}`}).join("\n")} ]`;
}

async function iconsApple(link){

    let metadata = await Image(link, {
        widths: [180],
        formats: ["png"],
        outputDir: "_site/img",
    });

    return `${Object.values(metadata.png).map((icn, i) => {
         return `----`;
    })}`;
}


module.exports = function(eleventyConfig) {
    
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    eleventyConfig.addLiquidShortcode("image", imageShortcode);
    eleventyConfig.addJavaScriptFunction("image", imageShortcode);

    eleventyConfig.addNunjucksAsyncShortcode("imageURL", imageURL);
    eleventyConfig.addLiquidShortcode("imageURL", imageURL);
    eleventyConfig.addJavaScriptFunction("imageURL", imageURL);

    eleventyConfig.addNunjucksAsyncShortcode("homepageImage", homepageImage);
    eleventyConfig.addLiquidShortcode("homepageImage", homepageImage);
    eleventyConfig.addJavaScriptFunction("homepageImage", homepageImage);

    eleventyConfig.addNunjucksAsyncShortcode("supportImage", supportImage);
    eleventyConfig.addLiquidShortcode("supportImage", supportImage);
    eleventyConfig.addJavaScriptFunction("supportImage", supportImage);

    eleventyConfig.addNunjucksAsyncShortcode("featuredImage", featuredImage);
    eleventyConfig.addLiquidShortcode("featuredImage", featuredImage);
    eleventyConfig.addJavaScriptFunction("featuredImage", featuredImage);

    eleventyConfig.addNunjucksAsyncShortcode("slug", makeSlug);
    eleventyConfig.addLiquidShortcode("slug", makeSlug);
    eleventyConfig.addJavaScriptFunction("slug", makeSlug);

    eleventyConfig.addNunjucksFilter("materialslug", (s)=>{
        return slugify(s);
    });
    eleventyConfig.addLiquidFilter("materialslug", (s)=>{
        return slugify(s);
    });
    

    eleventyConfig.addShortcode("audio", (link) => {
        let filename = link.substring(link.lastIndexOf('/')+1);
        let newPath = 'audio/' + filename;
        let l = "src/" + link.toString();

        if (!fs.existsSync(path.join(__dirname, "_site/audio"))){
            fs.mkdirSync(path.join(__dirname, "_site/audio"), true);
            console.log('[11ty] Creating _site/audio');
        }

        fs.copyFile( path.join(__dirname, l), path.join(__dirname, '_site/' + newPath), (err) => {
            if (err) throw err;
            console.log(`[11ty] Copying _site/${newPath} from ./${l}`);
        });

        return "./" + newPath;
    });

    eleventyConfig.addNunjucksAsyncShortcode("icons", iconsImages);
    eleventyConfig.addLiquidShortcode("icons", iconsImages);
    eleventyConfig.addJavaScriptFunction("icons", iconsImages);

    // eleventyConfig.addPassthroughCopy({ 'work/second-work/audio.mp3': 'audio/audio.mp3' });

    eleventyConfig.addCollection("everything", function(collection) {
        let tagSet = new Set();

        collection.getAll().forEach(function(item) {
        if( "tags" in item.data ) {
            let tags = item.data.tags;
    
            tags = tags.filter(function(item) {
            switch(item) {
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
    
        return [...tagSet];
    });

    eleventyConfig.addCollection("worksByYear", function (collection) {
        const itemsPerPage = 5;
        let blogpostsByCategories = []; // The Big Fish
        let allBlogposts = collection.getFilteredByTags("work");
        let blogpostsCategories = getAllKeyValues(allBlogposts, "year");
        

        // walk over each unique category
        blogpostsCategories.forEach((category) => {
            let sanitizedCategory = lodash.deburr(category).toLowerCase();
            
            // create array of posts in that category
            let postsInCategory = allBlogposts.filter((post, index) => {
                return post.data.year == sanitizedCategory;
            });

            blogpostsByCategories.push({
                title: category.toString(),
                items: postsInCategory,
            });
        
            // // chunck the array of posts
            // let chunkedPostsInCategory = lodash.chunk(postsInCategory, itemsPerPage);
        
            // // create array of page slugs
            // let pagesSlugs = [];
            // for (let i = 0; i < chunkedPostsInCategory.length; i++) {
            //     let categorySlug = strToSlug(category);
            //     let pageSlug = i > 0 ? `${categorySlug}/${i + 1}` : `${categorySlug}`;
            //     pagesSlugs.push(pageSlug);
            // }
        
            // create array of objects
            // postsInCategory.forEach((posts, index) => {
                 
            // });
        });
    
        return blogpostsByCategories;
    });

    eleventyConfig.addCollection("workByType", function (collection) {
        
        const itemsPerPage = 5;
        let blogpostsByCategories = []; // The Big Fish
        let allBlogposts = collection.getFilteredByTags("work");
        let blogpostsCategories = getAllKeyValues(allBlogposts, "type");
        

        // walk over each unique category
        blogpostsCategories.forEach((category) => {
            let sanitizedCategory = lodash.deburr(category).toLowerCase();
            
            // create array of posts in that category
            let postsInCategory = allBlogposts.filter((post, index) => {
                return post.data.type == sanitizedCategory;
            });

            blogpostsByCategories.push({
                title: category,
                items: postsInCategory,
            });
        
            // // chunck the array of posts
            // let chunkedPostsInCategory = lodash.chunk(postsInCategory, itemsPerPage);
        
            // // create array of page slugs
            // let pagesSlugs = [];
            // for (let i = 0; i < chunkedPostsInCategory.length; i++) {
            //     let categorySlug = strToSlug(category);
            //     let pageSlug = i > 0 ? `${categorySlug}/${i + 1}` : `${categorySlug}`;
            //     pagesSlugs.push(pageSlug);
            // }
        
            // create array of objects
            // postsInCategory.forEach((posts, index) => {
                 
            // });
        });
    
        return blogpostsByCategories;
    });

    eleventyConfig.addCollection("workByMaterials", function (collection) {
        const itemsPerPage = 5;
        let blogpostsByCategories = []; // The Big Fish
        let allBlogposts = collection.getFilteredByTags("work");
        let blogpostsCategories = getAllKeyValues(allBlogposts, "materials");
        

        // walk over each unique category
        blogpostsCategories.forEach((material) => {
            let sanitizedCategory = lodash.deburr(material).replace(/[^a-zA-Z]+/g, '').toLowerCase();

            let slug = slugify(material);
            // create array of posts in that category
            let postsInMaterial = allBlogposts.filter((post, index) => {
                const map1 = post.data.materials.map(x => lodash.deburr(x).replace(/[^a-zA-Z]+/g, '').toLowerCase());

                return  map1.includes(sanitizedCategory);
            });

            // make slug
            blogpostsByCategories.push({
                title: material,
                slug: slug,
                items: postsInMaterial,
            });
        });
    
        return blogpostsByCategories;
    });

    eleventyConfig.addCollection("materials", function(collection) {
        let materialSet = new Set();

        collection.getAll().forEach(function(item) {
            if( "materials" in item.data ) {
                let materials = item.data.materials;
        
                materials = materials.filter(function(item) {
                    switch(item) {
                        case "all":
                        case "nav":
                        case "post":
                        case "posts":
                        return false;
                    }
            
                    return true;
                });
        
                for (const material of materials) {
                    materialSet.add(material);
                }
            }
        });
        // returning an array in addCollection works in Eleventy 0.5.3
        return [...materialSet];
    });
    
    eleventyConfig.addCollection("news", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/news/*");
    });

    eleventyConfig.addPassthroughCopy("img");
    // eleventyConfig.addPassthroughCopy('js');
    // eleventyConfig.addPassthroughCopy('audio');
    eleventyConfig.addPassthroughCopy('.nojekyll');
    eleventyConfig.addPassthroughCopy({ "src/static" : "/" });

    return {
        dir: {
            output: "_site",
            input: "src"
        },
        passthroughFileCopy: true,
    };
};
