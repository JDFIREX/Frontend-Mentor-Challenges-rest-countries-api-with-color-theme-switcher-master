import { countriesList } from "./countriesList.js"

let detailDiv = document.createElement("div");
detailDiv.classList.add("detail");

setTimeout(() => {
    detailDiv.innerHTML = `
       <button class="back" type="submit">Back</button>
       <div class="details" >
            <div class="d_img" style="background-image: url('${countriesList[21].flag}');"></div>
            <div class="d_info" >
                <h1 class="info_h">${countriesList[21].name}</h1>
                <div class="info_left">
                    <p class="i_native_name">${countriesList[21].nativeName}</p>
                    <p class="i_population">${countriesList[21].population}</p>
                    <p class="i_region">${countriesList[21].region}</p>
                    <p class="i_sub_region">${countriesList[21].subregion}</p>
                    <p class="i_captial">${countriesList[21].capital}</p>
                </div>
                <div class="info_right">
                    <p class="i_domain">${countriesList[21].topLevelDomain}</p>
                    <p class="i_currencies">${countriesList[21].currencies}</p>
                    <p class="i_languages">${languagesprint(countriesList[21].languages)}</p>
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
}