let gs = gsap.timeline({defaults: {ease: "Power2.inOut"}});
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

})
inner.then(r => {
    document.querySelector(".search_filter").addEventListener('click',(e) => Options(e))
}).catch(err => console.log(err))


function Options(e){
    document.querySelector(".search_filter").dataset.open == "false" ? openOptions() : closeOptions();
}

function openOptions(){

    document.querySelector(".search_filter").dataset.open = "true";

    gs.to('.filter_angle',.2,{
        rotate: "0deg"
    }).to('.filter_options',0,{
        visibility : "visible",
        y: -20
    }).to(".filter_options",.3,{
        y: 0,
        opacity: 1
    })
    document.querySelectorAll('.fiter_option').forEach((f,b) => {
        gs.to(f,0,{
            y: 25 * b * -1,
        }).to(f,.1,{
            y: 0,
            opacity : 1
        })
    })
    
    window.addEventListener('click',clickOverSearch,true)
}

function clickOverSearch(event){

    if(document.querySelector(".search_filter").dataset.open == "true"){
        event.path[0] == document.querySelector('.search_filter') || event.path[1] == document.querySelector(".filter_options") ? null : closeOptions()
    }

}

function closeOptions(){

    document.querySelector(".search_filter").dataset.open = "false";

    gs.to('.filter_angle',.2,{
        rotate: "-180deg"
    })
    document.querySelectorAll('.fiter_option').forEach((f,b) => {
        gs.to(f,.1,{
            opacity : 0
        })
    })
    gs.to(".filter_options",.3,{
        opacity: 0
    }).to(".filter_options",0,{
        visibility : "hidden",
    })

    window.removeEventListener('click',clickOverSearch,true)
}



export let div = searchDiv;