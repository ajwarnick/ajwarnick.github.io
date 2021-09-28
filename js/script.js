console.log("load");

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

var options = {
  valueNames: ["title", "year", { name: "warnickNumber", attr: "data-id" }]
};

var workList = new List("work-list", options);

(() => {
  /* */
  if (document.querySelector(".list li")) {
    console.log("Works");
    // let works = document.querySelectorAll("list li")
    document.querySelectorAll(".list li").forEach(function (obj) {
      let img = obj.querySelector(".image");
      let x = getRandomInt(window.innerWidth - img.offsetWidth);
      let y = getRandomInt(window.innerHeight - img.offsetHeight);

      img.style.display = "none";
      img.style.top = y + "px";
      img.style.left = x + "px";

      // obj.addEventListener("click", function (e) {
      //   console.log(e);
      // });
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
