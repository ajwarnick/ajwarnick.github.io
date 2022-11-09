import WaveSurfer from 'wavesurfer.js';


// Load Service Worker

// if ("serviceWorker" in navigator && "PushManager" in window) {
//   navigator.serviceWorker.register("./service-worker.js");
//   console.log("Service Worker is registered");
// }

// const isInStandaloneMode = () =>
//   window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone || document.referrer.includes("android-app://");

// if (isInStandaloneMode()) {
//   console.log("webapp is installed");
// }

// Main Script

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let options = {
  valueNames: ["title", "year", { name: "warnickNumber", attr: "data-id" }, { name: 'dimentions', attr: 'data-dimention' }, "materials", "type"]
};

let workList = new List("work-list", options);

(() => {
  /* */
  if (document.querySelector(".list li")) {
    // console.log("Works");
    // let works = document.querySelectorAll("list li")
    document.querySelectorAll(".list li").forEach(function (obj) {
      let img = obj.querySelector(".image");
      let x = getRandomInt(window.innerWidth - img.offsetWidth);
      let y = getRandomInt(window.innerHeight - img.offsetHeight);

      img.style.display = "none";
      img.style.top = y + "px";
      img.style.left = x + "px";
    });
  }
})();

//
//
// CLOSE ELEMENT
//
//
(() => {
  /* */
  if (document.querySelector(".close")) {
    document.querySelectorAll(".close").forEach(function (obj) {
      obj.addEventListener("click", function (e) {
        e.target.parentNode.remove();
      });
    });
  }
})();

//
//
// SUPPORT IMAGES
//
//
// (() => {
//   /* */
//   if (document.querySelector(".support_image")) {
//     document.querySelectorAll(".support_image").forEach(function (obj) {
//       obj.addEventListener("click", function (el) {
//         obj.classList.toggle("active");
//       });
//     });
//   }
// })();


// 
// 
// grid-trigger
// 
// 
(() => {
  /* */
  if (document.querySelector(".grid-trigger")) {
    document.querySelectorAll(".grid-trigger").forEach(function (obj) {
      obj.addEventListener("click", function (el) {
        document.body.classList.toggle("list-view")
        document.body.classList.toggle("grid-view");
      });
    });
  }
})();


// 
// 
// Lightbox
// 
//
import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js';
// import PhotoSwipe from 'photoswipe/dist/photoswipe.esm.js';

const lightboxInIt = () => {
  if(document.querySelector("a.lightbox")){
    const lightbox = new PhotoSwipeLightbox({
      // may select multiple "galleries"
      gallery: '#work',
    
      // Elements within gallery (slides)
      children: 'a.lightbox',
    
      // setup PhotoSwipe Core dynamic import
      pswpModule: () => import('../../node_modules/photoswipe/dist/photoswipe.esm.js'),
      arrowPrevSVG: '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 18 18"><path d="M16.02 9.09H1.98m5.34 4.98L2.11 9.1l5.2-5.17"/></svg>',
      arrowNextSVG: '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 18 18"><path d="M1.98 8.91h14.04m-5.34-4.98 5.21 4.97-5.2 5.17"/></svg>',
      closeSVG:'<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 18 18"><path d="M13.96 13.96 4.04 4.04m0 9.92 9.92-9.92"/></svg>',
      zoomSVG: '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 18 18"><path d="M3.6 3.6h10.93v10.93H3.6zM9 6.15v5.7M11.85 9h-5.7"/></svg>',
      showHideAnimationType: 'none',
      bgOpacity: 1,
    });

    // parse data-google-map-url attribute
    lightbox.addFilter('itemData', (itemData, index) => {
      const googleMapUrl = itemData.element.dataset.googleMapUrl;
      if (googleMapUrl) {
        itemData.googleMapUrl = googleMapUrl;
      }
      return itemData;
    });

    lightbox.addFilter('itemData', (itemData, index) => {
      const bunnyUrl = itemData.element.dataset.bunnyUrl;
      if (bunnyUrl) {
        itemData.bunnyUrl = bunnyUrl;
      }
      return itemData;
    });

    // override slide content
    lightbox.on('contentLoad', (e) => {
      const { content } = e;
      if (content.type === 'google-map') {
        // prevent the deafult behavior
        e.preventDefault();

        // Create a container for iframe
        // and assign it to the `content.element` property
        content.element = document.createElement('div');
        content.element.className = 'pswp__google-map-container';

        const iframe = document.createElement('iframe');
        iframe.setAttribute('allowfullscreen', '');
        iframe.src = content.data.googleMapUrl;
        content.element.appendChild(iframe);
      }

      if(content.type === 'bunny-video'){
        e.preventDefault();

        content.element = document.createElement('div');
        content.element.className = 'pswp__bunny-container';

        const iframe = document.createElement('iframe');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('allow', 'accelerometer; gyroscope; encrypted-media; picture-in-picture;');
        iframe.src = content.data.bunnyUrl;
        content.element.appendChild(iframe);
      }
    });


    lightbox.init();
  }
 
};

const lightboxListInIt = () => {
  if(document.querySelector(".lightbox")){
    let sources = [];
    document.querySelectorAll(".lightbox").forEach(function (obj) {
      sources.push({
        src: obj.dataset.lightroomImage,
        width: obj.dataset.lightroomWidth,
        height: obj.dataset.lightroomHeight,
        alt: obj.dataset.lightroomAlt
      })
    });
  
    const options = {
      dataSource: sources,
      arrowPrevSVG: '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 18 18"><path d="M16.02 9.09H1.98m5.34 4.98L2.11 9.1l5.2-5.17"/></svg>',
      arrowNextSVG: '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 18 18"><path d="M1.98 8.91h14.04m-5.34-4.98 5.21 4.97-5.2 5.17"/></svg>',
      closeSVG:'<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 18 18"><path d="M13.96 13.96 4.04 4.04m0 9.92 9.92-9.92"/></svg>',
      zoomSVG: '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 18 18"><path d="M3.6 3.6h10.93v10.93H3.6zM9 6.15v5.7M11.85 9h-5.7"/></svg>',
      showHideAnimationType: 'none',
      bgOpacity: 1,
      pswpModule: () => import('../../node_modules/photoswipe/dist/photoswipe.esm.js')
    };

    // options.index = 0; // defines start slide index
    // const pswp = new PhotoSwipe(options);

    const lightbox = new PhotoSwipeLightbox(options);
    lightbox.init();

    document.querySelectorAll(".lightbox-trigger").forEach(function (obj) {
      obj.addEventListener("click", function (el) {
        // pswp.init(); // initializing PhotoSwipe core adds it to DOM
        lightbox.loadAndOpen(0);
      });
    });
  }
}




//
//
// AUDIO PLAYER
//
//
const audioPlayerInIt = () => {
  const audioPlayer = document.querySelectorAll(".audioplayer");

  audioPlayer.forEach((player) => { 
    const wave = player.querySelector(".wave");
    const playButton = player.querySelector(".play");
    const volumeButton = player.querySelector('input[type="range"]');
    const muteButton = player.querySelector(".mute");
  
    let vlm = 30;
  
    var wavesurfer = WaveSurfer.create({
      container: "#" + wave.id,
      waveColor: getComputedStyle(document.body).getPropertyValue('--gray'),
      progressColor: getComputedStyle(document.body).getPropertyValue('--secondary-color'),
      barWidth: parseInt( getComputedStyle(document.body).getPropertyValue('--border-size') ),
      barHeight: 5,
      height: 50,
      responsive: true,
      cursorWidth: parseInt( getComputedStyle(document.body).getPropertyValue('--border-size') )
    });
  
    const filePath = player.dataset.audio.startsWith("./") ?  window.location.protocol + "//" + window.location.host + "/" + player.dataset.audio.replace("./", "") : player.dataset.audio;
    wavesurfer.load( filePath );
  
    playButton.addEventListener("click", (event) => {
      // wavesurfer.play(); // or  wavesurfer.pause();
      wavesurfer.playPause();
      player.classList.toggle("playing");
    });
  
    muteButton.addEventListener("click", (event) => {
      if (player.classList.contains("muted")) {
        volumeButton.value = vlm;
        volumeButton.style.backgroundSize = vlm + "% 100%";
      } else {
        volumeButton.value = 0;
        volumeButton.style.backgroundSize = "0% 100%";
      }
  
      wavesurfer.toggleMute();
      player.classList.toggle("muted");
    });
  
    wavesurfer.on("finish", function () {
      player.classList.remove("playing");
    });
  
    volumeButton.addEventListener("input", (event) => {
      let target = event.target;
      if (event.target.type !== "range") {
        target = document.getElementById("range");
      }
      const min = target.min;
      const max = target.max;
      vlm = target.value;
  
      if (vlm == 0) {
        player.classList.add("muted");
      } else {
        player.classList.remove("muted");
      }
  
      wavesurfer.setVolume(vlm / 10);
  
      target.style.backgroundSize = ((vlm - min) * 100) / (max - min) + "% 100%";
    });
  });
}

const menuInIt = () => {
  document.querySelector("#hamburger").addEventListener("click", (event) => {
    document.querySelector("#hamburger").classList.toggle("open");
    document.body.classList.toggle("menuopen");
  });


  document.querySelectorAll('.filter-trigger').forEach(function (obj) {
    obj.addEventListener("click", function (e) {
      e.preventDefault();
      e.target.classList.toggle("active");
      document.body.classList.toggle("filteropen");
    });
  });
}

const searchInIt = () => {
  document.querySelectorAll('.search-icon').forEach(function (obj) {
    obj.addEventListener("click", function (e) {
      console.log("search");
    });
  });
}

window.addEventListener('load', function () {

  if( document.querySelector(".audioplayer") ){
    audioPlayerInIt();
  }

  if( document.querySelector(".lightbox") ){
    lightboxInIt();
  }

  if (document.querySelector(".lightbox-trigger")) {
    lightboxListInIt();
  }

  if (document.querySelector("#hamburger")) {
    menuInIt();
  }

  if(document.querySelector(".search-icon")){
    searchInIt();
  }

})
