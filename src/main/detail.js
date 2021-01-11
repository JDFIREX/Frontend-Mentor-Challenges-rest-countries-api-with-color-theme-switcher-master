import { countriesList } from "/src/main/countriesList.js"
import gsap from "/node_modules/gsap/all.js"


let gs = gsap.timeline({defaults: {ease: "Power2.inOut"}});
let detailDiv = document.createElement("div");
detailDiv.classList.add("detail");

setTimeout(() => {
    detailDiv.innerHTML = `
        <div class="back">
            <img class="back_img" src="./../../images/long-arrow-alt-left-solid.svg" alt="back">
            <p>Back</p>
        </div>
       <div class="details" >
            <div class="d_img"></div>
            <div class="d_info" >
                <h1 class="info_h">Name</h1>
                <div class="info_box">
                    <div class="info_left">
                        <p class="i_native_name"></p>
                        <p class="i_population"></p>
                        <p class="i_region"></p>
                        <p class="i_sub_region"></p>
                        <p class="i_captial"></p>
                    </div>
                    <div class="info_right">
                        <p class="i_domain"></p>
                        <p class="i_currencies"></p>
                        <p class="i_languages"></p>
                    </div>
                </div>
                <div class="info_f">
                    <p class="i_border">Border Countries: </p>
                    <div class="borders">
                        
                    </div>
                </div>
            </div>
       </div>
    `

    setTimeout(() => {
        document.querySelector(".back").addEventListener('click',(e) => detailsBack(e))
    }, 10);
}, 1000);

function findBorders(b){
    let list = "";
    b.map(a => {
        countriesList.map(c => {
            if(c.alpha3code == a){
                list += `<p class="border">${c.name}</p>`
            }
        })
    })
    return list;
}

function languagesprint(l){
    l = l.map(x => x.name);
    return l.join(", ")
}

export function details(i){
    let inner = new Promise (resolve => {
        document.querySelector(".d_img").style.backgroundImage = `url('${countriesList[i].flag}')`
        document.querySelector(".info_h").innerHTML = `${countriesList[i].name}`;
        document.querySelector(".i_native_name").innerHTML = `Native Name: <span>${countriesList[i].nativeName ? countriesList[i].nativeName : ""}</span>`;
        document.querySelector(".i_population").innerHTML = `Population: <span>${countriesList[i].population ? countriesList[i].population : ""}</span>`;
        document.querySelector(".i_region").innerHTML = `Region: <span>${countriesList[i].region ? countriesList[i].region : ""}</span>`;
        document.querySelector(".i_sub_region").innerHTML = `Sub Region: <span>${countriesList[i].subregion ? countriesList[i].subregion : ""}</span>`;
        document.querySelector(".i_captial").innerHTML = `Sub Region: <span>${countriesList[i].capital ? countriesList[i].capital : ""}</span>`;
        document.querySelector(".i_domain").innerHTML = `Top Level Domain: <span>${countriesList[i].topLevelDomain ? countriesList[i].topLevelDomain : ""}</span>`;
        document.querySelector(".i_currencies").innerHTML = `Currencies: <span>${countriesList[i].currencies ? countriesList[i].currencies : ""}</span>`;
        document.querySelector(".i_languages").innerHTML = `Languages: <span>${countriesList[i].languages.length > 0 ? languagesprint(countriesList[i].languages) : ""}</span>`;
        document.querySelector(".borders").innerHTML = `${countriesList[i].borders.length > 0 ? findBorders(countriesList[i].borders) : ""}`;

        resolve(detailDiv)
    })  

    inner.then(r => {
        gs.to(r,0,{
            opacity: 0
        })
        .to(r,.5,{
            left : "0vw",
            opacity : 1,
            zIndex : 2000000000
        }).to(".countries",0,{
            display: "none"
        })
    })
};


function detailsBack(e){
    let inner = new Promise (resolve => {
        gs.to(".countries",0,{
            display: "block"
        }).to(detailDiv,.5,{
            left : "200vw",
            opacity : 0
        }).to(detailDiv,0,{
            zIndex : 0
        })
        

        resolve(detailDiv)
    })  

    inner.then(r => {
        document.querySelector(".d_img").style.backgroundImage = `none`
        document.querySelector(".info_h").innerHTML = "";
        document.querySelector(".i_native_name").innerHTML = "";
        document.querySelector(".i_population").innerHTML = "";
        document.querySelector(".i_region").innerHTML = "";
        document.querySelector(".i_sub_region").innerHTML = "";
        document.querySelector(".i_captial").innerHTML = "";
        document.querySelector(".i_domain").innerHTML = "";
        document.querySelector(".i_currencies").innerHTML = "";
        document.querySelector(".i_languages").innerHTML = "";
        document.querySelector(".borders").innerHTML = "";
    })
}



export let div = detailDiv;