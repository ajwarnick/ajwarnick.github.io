
//
//
// DARK MODE
//
//

// This code assumes a Light Mode default
if (
    /* This condition checks whether the user has set a site preference for dark mode OR a OS-level preference for Dark Mode AND no site preference */
    localStorage.getItem('color-mode') === 'dark' ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches &&
     !localStorage.getItem('color-mode'))
) {
    // if true, set the site to Dark Mode
    document.documentElement.setAttribute('color-mode', 'dark')
}


const toggleColorMode = (eL) => {
    console.log("yo yo");
    // Switch to Light Mode
    if ( document.documentElement.getAttribute("color-mode") === "dark" ) {
    	// Sets the custom HTML attribute
    	document.documentElement.setAttribute("color-mode", "light");

		//Sets the user's preference in local storage
		localStorage.setItem("color-mode", "light")
		return;
	}
    
    /* Switch to Dark Mode
    Sets the custom HTML attribute */
    document.documentElement.setAttribute("color-mode", "dark");

	// Sets the user's preference in local storage
	localStorage.setItem("color-mode", "dark");
};

window.addEventListener('load', function () {
    if (document.querySelector(".mode-toggle")) {
        document.querySelector(".mode-toggle").addEventListener('click', function(event) {
            toggleColorMode();
        });
    }
})