
//
//
// DARK MODE
//
//


const toggleDarkMode = () => {
    document.body.classList.toggle("darkmode");

    let setBoolean = JSON.parse(localStorage.getItem('darkMode')) == true ? null : "true";
    localStorage.setItem('darkMode', JSON.parse(setBoolean));
}

const darkmodeInIt = () => {

    if(JSON.parse(localStorage.getItem('darkMode')) == true){
        document.body.classList.add("darkmode");
    }

    if (document.querySelector(".mode-toggle")) {
        document.querySelectorAll(".mode-toggle").forEach(function (obj) {
        obj.addEventListener("click", function (e) {
            toggleDarkMode();
        });
        });
    }

};

window.addEventListener('load', function () {
    if (document.querySelector(".mode-toggle")) {
      darkmodeInIt();
    }
})