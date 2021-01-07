import { countriesList } from "./countriesList.js"

let detailDiv = document.createElement("div");
detailDiv.classList.add("detail");

setTimeout(() => {
    detailDiv.innerHTML = `
        <div class="back">
            <img class="back_img" src="./../../images/long-arrow-alt-left-solid.svg" alt="back">
            <p>Back</p>
        </div>
       <div class="details" >
            <div class="d_img" style="background-image: url('${countriesList[21].flag}');"></div>
            <div class="d_info" >
                <h1 class="info_h">${countriesList[21].name}</h1>
                <div class="info_box">
                    <div class="info_left">
                        <p class="i_native_name">Native Name: <span>${countriesList[21].nativeName}</span></p>
                        <p class="i_population">Population: <span>${countriesList[21].population}</span></p>
                        <p class="i_region">Region: <span>${countriesList[21].region}</span></p>
                        <p class="i_sub_region">Sub Region: <span>${countriesList[21].subregion}</span></p>
                        <p class="i_captial">Capital: <span>${countriesList[21].capital}</span></p>
                    </div>
                    <div class="info_right">
                        <p class="i_domain">Top Level Domain: <span>${countriesList[21].topLevelDomain}</span></p>
                        <p class="i_currencies">Currencies: <span>${countriesList[21].currencies}</span></p>
                        <p class="i_languages">Languages : <span>${languagesprint(countriesList[21].languages)}</span></p>
                    </div>
                </div>
                <div class="info_f">
                    <p class="i_border">Border Countries: </p>
                    <div class="borders">
                        ${findBorders(countriesList[21].borders)}
                    </div>
                </div>
            </div>
       </div>
    `
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

export function details(index){
    console.log(detailDiv)
};


export let div = detailDiv;