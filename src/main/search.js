import * as Countries from "./countriesList.js"
import gsap from "./../../node_modules/gsap/all.js"

let gs = gsap.timeline({defaults: {ease: "Power2.inOut"}});
let searchDiv = document.createElement("div");
searchDiv.classList.add("search");

let inner = new Promise((resolve, reject) => {
    searchDiv.innerHTML = `
        <div class="search_box">
            <img src="./../../images/search-solid.svg" alt="search" class="search_img" >
            <label id="search_label" style="visibility:hidden;" for="search_input"></label>
            <input type="text" class="search_input" name="search_input" id="search_input" placeholder="Search for a country..." >
        </div>
        <div class="search_filter" data-open="false">
            <p class="filter_p">Filter by Region</p>
            <img src="./../../images/angle-down-solid.svg" class="filter_angle" alt="filter">
        </div>
        <div class="filter_options">
            <div class="fiter_option" data-selected="false" data-region="Africa">
                <p class="option_p">Africa</p>
                <img src="./../../images/check-solid.svg" alt="check" class="option_check" >
            </div>
            <div class="fiter_option" data-selected="false" data-region="Americas">
                <p class="option_p">Americas</p>
                <img src="./../../images/check-solid.svg" alt="check" class="option_check" >
            </div>
            <div class="fiter_option" data-selected="false" data-region="Asia">
                <p class="option_p">Asia</p>
                <img src="./../../images/check-solid.svg" alt="check" class="option_check" >
            </div>
            <div class="fiter_option" data-selected="false" data-region="Europe">
                <p class="option_p">Europe</p>
                <img src="./../../images/check-solid.svg" alt="check" class="option_check" >
            </div>
            <div class="fiter_option" data-selected="false" data-region="Oceania">
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
    document.querySelectorAll(".fiter_option").forEach(f => f.addEventListener("click",(e) => setFiltr(e)))
    document.querySelector(".search_input").addEventListener("keyup",(e) => Searching(e))
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

let filters = []


function setFiltr(e){
    e.path[0].dataset.selected == "false" ? e.path[0].dataset.selected = "true" : e.path[0].dataset.selected = "false";
    filters = [];
    for(let i = 0 ; i < document.querySelector(".filter_options").childElementCount; i++){
        if(document.querySelector(".filter_options").children[i].dataset.selected == "true"){
            filters.push(document.querySelector(".filter_options").children[i].dataset.region)
        }
    }
    if(filters.length <= 0 || filters.length >= 5){
        gs.to(".countries",.5,{
            clipPath : "inset(0 50% 0 50%)",
            opacity : 0
        })
        setTimeout(() => {
            Countries.createCountryList(Countries.countriesList)
        }, 400);
        setTimeout(() => {
            gs.to('.countries',.3,{
                clipPath : "inset(0% 0% 0% 0%)",
                opacity : 1
            })
        }, 800);
    }else{
        let newList = Countries.countriesList.filter(c => {
            return filters.includes(c.region) ? c : 0;
        })
        gs.to(".countries",.5,{
            clipPath : "inset(0 50% 0 50%)",
            opacity : 0
        })
        setTimeout(() => {
            Countries.createCountryList(newList)
        }, 400);
        setTimeout(() => {
            gs.to('.countries',.3,{
                clipPath : "inset(0% 0% 0% 0%)",
                opacity : 1
            })
        }, 800);
    }
}

function Searching(e){
    let input = e.path[0].value.toLowerCase();
    let reg = new RegExp('^' + input)
    let newList = Countries.countriesList.filter(c => {
       return c.name,reg.test(c.name.toLowerCase()) ? c : null;
    })
    Countries.createCountryList(newList)
}

export let div = searchDiv;