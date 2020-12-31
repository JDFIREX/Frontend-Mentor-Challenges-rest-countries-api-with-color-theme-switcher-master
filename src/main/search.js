let searchDiv = document.createElement("div");
searchDiv.classList.add("search");
let inner = new Promise((resolve, reject) => {
    searchDiv.innerHTML = `
        <div class="search_box">
            <img src="./../../images/search-solid.svg" alt="search" class="search_img" >
            <input type="text" class="search_input" name="search_input" id="search_input" placeholder="Search for a country..." >
        </div>
        <div class="search_filter" data-open="false">
            <p>Filter by Region</p>
            <img src="./../../images/angle-down-solid.svg" class="filter_angle" alt="filter">
        </div>
        <div class="filter_options">
            <div class="fiter_option" data-selected="false" >
                <p class="option_p">Africa</p>
                <img src="./../../images/check-solid.svg" alt="check" class="option_check" >
            </div>
            <div class="fiter_option" data-selected="false" >
                <p class="option_p">America</p>
                <img src="./../../images/check-solid.svg" alt="check" class="option_check" >
            </div>
            <div class="fiter_option" data-selected="false" >
                <p class="option_p">Asia</p>
                <img src="./../../images/check-solid.svg" alt="check" class="option_check" >
            </div>
            <div class="fiter_option" data-selected="false" >
                <p class="option_p">Europe</p>
                <img src="./../../images/check-solid.svg" alt="check" class="option_check" >
            </div>
            <div class="fiter_option" data-selected="false" >
                <p class="option_p">Oceania</p>
                <img src="./../../images/check-solid.svg" alt="check" class="option_check" >
            </div>
        </div>
    `
    resolve(searchDiv)
    reject(searchDiv)

}).then(r => {
    document.querySelector(".search_filter").addEventListener('click',(e) => Options(e))
}).catch(err => console.log(err))

let gs = gsap.timeline({defaults: {ease: "Power2.inOut"}});

function Options(e){
    let element = e.path[0];
    let dataOpen = element.dataset.open;
    dataOpen == "false" ? openOptions(element) : closeOptions(element);
}
function openOptions(element){
    element.dataset.open = "true";

    gs.to('.filter_angle',.2,{
        rotate: "0deg"
    })
}
function closeOptions(element){
    element.dataset.open = "false";
    
    gs.to('.filter_angle',.2,{
        rotate: "-180deg"
    })
}


export let div = searchDiv;