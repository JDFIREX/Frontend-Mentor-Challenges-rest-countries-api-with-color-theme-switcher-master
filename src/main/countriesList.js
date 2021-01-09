import gsap from "./../../node_modules/gsap/all.js"
import * as detail from "./detail.js"

let countriesDiv = document.createElement("div");
countriesDiv.classList.add("countries");

// create element
let sliderDotDiv = document.createElement("div");
sliderDotDiv.classList.add("sliderDot")

let leftArrowSilder = document.createElement("div");
leftArrowSilder.classList.add("left-arrow");

let rightArrowSilder = document.createElement("div");
rightArrowSilder.classList.add("right-arrow");

export let countriesList = []
let sliderPosition = 0;
//  create list 
fetch('https://restcountries.eu/rest/v2/all')
.then(r => r.json())
.then(function (response) {
    response.map((a,b) => {
        a.name == "Åland Islands" ? a.name = "Aland Islands" : a.name = a.name;
        let t = {
            alpha3code : a.alpha3Code,
            name : a.name,
            nativeName : a.nativeName,
            population : a.population,
            region : a.region,
            subregion : a.subregion,
            capital : a.capital,
            borders : a.borders,
            topLevelDomain : a.topLevelDomain[0],
            currencies :  a.currencies[0].name,
            languages : a.languages,
            flag : a.flag,
            index : b
        }
        countriesList.push(t)
    })

})
.catch(function (error) {
console.log(error);
}).then(r => {
    countriesList.map(a => {
        let t = a.population;
        t = t.toString().split("").reverse();
        if(t.length > 3){
            let l = Math.ceil((t.length / 3) - 1);
            let t2 = []
            for(let i = 0 ; i < l; i++){
                let n = [];
                for(let j = 0; j < 3 ; j++){
                    let x = t[0];
                    t.shift();
                    n.unshift(x)
                }
                n = n.join("")
                t2.unshift(n)
            }
            t2.unshift(t.reverse().join(""))
            t2 = t2.join(",")
            return a.population = t2;
        }else{
            return a;
        }
    })
    
    createCountryList(countriesList)
})

export function createCountryList(List){
    sliderPosition = 0;
    countriesDiv.innerHTML = "";
    sliderDotDiv.innerHTML = "";


    let ListLength = Math.ceil(List.length / 8);
    let count = 0;

    for(let i = 0 ; i < ListLength; i++){
        let t2 = document.createElement('div');
        t2.classList.add("country_page");
        t2.dataset.position = i;
        i == 0? t2.dataset.visible = "true" : t2.dataset.visible = "false";

        for(let i = count; i < (count + 8) ;i++){

            if(List[i]){
                let t = document.createElement('div');
                t.classList.add("country");
                t.dataset.index = List[i].index;
                t.dataset.name = List[i].name;
                t.innerHTML = `
                    <div class="country_img_box" style="background-image: url('${List[i].flag}');">
                    </div>
                    <div class="country_info" >
                        <h1 class="country_name"        >${List[i].name}</h1>
                        <p class="country_population"   >Population: <span>${List[i].population}</span></p>
                        <p class="country_region"       >Region: <span>${List[i].region}</span></p>
                        <p class="country_capital"      >Capital: <span>${List[i].capital}</span></p>
                    </div>
                `
                t2.appendChild(t)
            }

        }

        count+=8;
        countriesDiv.appendChild(t2)
    }

    for(let i = 0; i < ListLength;i++){

        let t = document.createElement("div");
        t.classList.add("dot")
        t.dataset.position = i;
        i == 0? t.dataset.visible = "true" : t.dataset.visible = "false";
        sliderDotDiv.appendChild(t)

    }
    document.querySelectorAll(".country").forEach(c => {
        c.addEventListener("click", (e) => detail.details(Number(e.path[0].dataset.index)))
    })

}

// left arrow

leftArrowSilder.innerHTML = `
<img src="./../../images/angle-left-solid.svg" alt="left arrow" class="left_arrow_img" >
`
leftArrowSilder.addEventListener("click",() => {
    sliderPosition--
    sliderPosition <= 0 ? sliderPosition = document.querySelector(".countries").childElementCount - 1 : sliderPosition = sliderPosition;
    CountrySlider(sliderPosition,600,-400)})

// right arrow
rightArrowSilder.innerHTML = `
    <img src="./../../images/angle-right-solid.svg" alt="right arrow" class="right_arrow_img">
`
rightArrowSilder.addEventListener("click",() => {
    sliderPosition++
    sliderPosition >= document.querySelector(".countries").childElementCount ? sliderPosition = 0 : sliderPosition = sliderPosition;
    CountrySlider(sliderPosition,-400,600)})


let gs = gsap.timeline({defaults: {ease: "Power2.inOut"}});

function CountrySlider(sliderPosition,x1,x2){
    document.querySelector(".countries").childNodes.forEach(c => {
        if(c.dataset.visible == "true"){
            gs.to(c,.3,{
                x : x1,
                opacity: 0,
            })
            gs.to(c,0,{
                delay: .1,
                x: 0
            })
        }
    })
    setTimeout(() => {
        document.querySelector(".countries").childNodes.forEach(c => c.dataset.visible == "true" ? c.dataset.visible = "false" : null)
        document.querySelector(".sliderDot").childNodes.forEach(c => c.dataset.visible == "true" ? c.dataset.visible = "false" : null)
        document.querySelector(".sliderDot").children[sliderPosition].dataset.visible = "true";
        document.querySelector(".countries").children[sliderPosition].style.opacity = "0"
        document.querySelector(".countries").children[sliderPosition].dataset.visible = "true";
        setTimeout(() => {
            gs.to(document.querySelector(".countries").children[sliderPosition],0,{
                x : x2,
                opacity : 0,
            }).to(document.querySelector(".countries").children[sliderPosition],.4,{
                x : 0,
                opacity: 1
            })
        }, 50);
    }, 300);
}

//  export 
export let div = countriesDiv;
export let sliderDot = sliderDotDiv;
export let leftArrow = leftArrowSilder;
export let rightArrow = rightArrowSilder;
