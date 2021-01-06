
let headerDiv = document.createElement("div");
headerDiv.classList.add("header")



let moon = new Promise(resolve => {
    headerDiv.innerHTML = `
        <h1 class="header_h">Where in the world?</h1>
        <img src="./../images/moon.svg" alt="moon" class="moon">
        <p class="dark">Dark Mode</p>
    `
    resolve(headerDiv)
})

moon.then(r => {
    document.querySelector(".moon").addEventListener("click",(e) => Mode(e))
    document.querySelector(".dark").addEventListener("click",(e) => Mode(e))
})

let darkMode = true;


function Mode(e){
    darkMode ? WhiteMode() : DarkMode()
    darkMode = !darkMode;
}
function WhiteMode(){
    document.querySelector(".body").style.backgroundColor = "hsl(207, 26%, 17%)"
    document.querySelector(".main").style.backgroundColor = "hsl(0, 0%, 98%)"
    document.querySelectorAll(".country").forEach(e => {e.style.backgroundColor = "hsl(0, 0%, 100%)"});
    document.querySelectorAll(".country_name").forEach(f => f.style.color = "hsl(200, 15%, 8%)")
    document.querySelectorAll(".country_population").forEach(f => f.style.color = "hsl(200, 15%, 8%)")
    document.querySelectorAll(".country_region").forEach(f => f.style.color = "hsl(200, 15%, 8%)")
    document.querySelectorAll(".country_capital").forEach(f => f.style.color = "hsl(200, 15%, 8%)")
    document.querySelector(".search_box").classList.add("search_box_white")
    document.querySelector(".search_img").src = "./../../images/search-solid-black.svg"
    document.querySelector('.search_filter').style.backgroundColor = "hsl(0, 0%, 100%)"
    document.querySelector('.filter_p').style.color = "hsl(200, 15%, 8%)";
    document.querySelector(".filter_angle").src = "./../../images/angle-down-solid-black.svg"
    document.querySelector(".filter_options").style.backgroundColor = "hsl(0, 0%, 100%)";
    document.querySelectorAll(".option_p").forEach(f => f.style.color = "hsl(200, 15%, 8%)");
    document.querySelectorAll(".option_check").forEach(f => f.src = "./../../images/check-solid-black.svg")
    document.querySelector(".left_arrow_img").src = "./../../images/angle-left-solid-black.svg"
    document.querySelector(".right_arrow_img").src = "./../../images/angle-right-solid-black.svg"
    document.querySelector('.header').style.backgroundColor = "hsl(0, 0%, 100%)"
    document.querySelector(".moon").src = "./../../images/moon-regular.svg"
    document.querySelector(".dark").style.color = "hsl(200, 15%, 8%)"
    document.querySelector(".header_h").style.color = "hsl(200, 15%, 8%)"
}
function DarkMode(e){
    document.querySelector(".body").style.backgroundColor = "hsl(207, 26%, 17%)"
    document.querySelector(".main").style.backgroundColor = "hsl(207, 26%, 17%)"
    document.querySelector(".search_box").classList.remove("search_box_white")
    document.querySelectorAll(".country").forEach(e => {e.style.backgroundColor = "hsl(209, 23%, 22%)"});
    document.querySelector('.search_filter').style.backgroundColor = "hsl(209, 23%, 22%)"
    document.querySelector(".filter_options").style.backgroundColor = "hsl(209, 23%, 22%)";
    document.querySelector('.header').style.backgroundColor = "hsl(209, 23%, 22%)"
    document.querySelectorAll(".country_name").forEach(f => f.style.color = "hsl(0, 0%, 100%)")
    document.querySelectorAll(".country_population").forEach(f => f.style.color = "hsl(0, 0%, 100%)")
    document.querySelectorAll(".country_region").forEach(f => f.style.color = "hsl(0, 0%, 100%)")
    document.querySelectorAll(".country_capital").forEach(f => f.style.color = "hsl(0, 0%, 100%)")
    document.querySelector('.filter_p').style.color = "hsl(0, 0%, 100%)";
    document.querySelectorAll(".option_p").forEach(f => f.style.color = "hsl(0, 0%, 100%)");
    document.querySelector(".dark").style.color = "hsl(0, 0%, 100%)"
    document.querySelector(".header_h").style.color = "hsl(0, 0%, 100%)"
    document.querySelector(".filter_angle").src = "./../../images/angle-down-solid.svg"
    document.querySelectorAll(".option_check").forEach(f => f.src = "./../../images/check-solid.svg")
    document.querySelector(".left_arrow_img").src = "./../../images/angle-left-solid.svg"
    document.querySelector(".right_arrow_img").src = "./../../images/angle-right-solid.svg"
    document.querySelector(".moon").src = "./../../images/moon.svg"
    document.querySelector(".search_img").src = "./../../images/search-solid.svg"
}


export let div = headerDiv;