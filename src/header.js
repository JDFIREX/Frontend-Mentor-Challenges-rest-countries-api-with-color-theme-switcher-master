
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
    document.querySelector('.body').classList.add("body_white")
    
    document.querySelector(".search_img").src = "./../../images/search-solid-black.svg"
    document.querySelectorAll(".option_check").forEach(f => f.src = "./../../images/check-solid-black.svg")
    document.querySelector(".filter_angle").src = "./../../images/angle-down-solid-black.svg"
    document.querySelector(".left_arrow_img").src = "./../../images/angle-left-solid-black.svg"
    document.querySelector(".right_arrow_img").src = "./../../images/angle-right-solid-black.svg"
    document.querySelector(".moon").src = "./../../images/moon-regular.svg"
    document.querySelector(".back_img").src = "./../../images/long-arrow-alt-left-solid-black.svg"
}
function DarkMode(e){
    document.querySelector('.body').classList.remove("body_white")

    document.querySelector(".filter_angle").src = "./../../images/angle-down-solid.svg"
    document.querySelectorAll(".option_check").forEach(f => f.src = "./../../images/check-solid.svg")
    document.querySelector(".left_arrow_img").src = "./../../images/angle-left-solid.svg"
    document.querySelector(".right_arrow_img").src = "./../../images/angle-right-solid.svg"
    document.querySelector(".moon").src = "./../../images/moon.svg"
    document.querySelector(".search_img").src = "./../../images/search-solid.svg"
    document.querySelector(".back_img").src = "./../../images/long-arrow-alt-left-solid.svg"
}

export let div = headerDiv;