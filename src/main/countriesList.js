let countriesDiv = document.createElement("div");
countriesDiv.classList.add("countries");

let sliderDotDiv = document.createElement("div");
sliderDotDiv.classList.add("sliderDot")

export let countriesList = []
let sliderPosition = 0;

axios.get('https://restcountries.eu/rest/v2/all')
.then(function (response) {
    response.data.map(a => {
        let t = {
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
            flag : a.flag
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
                t.dataset.index = i;
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
}


export let div = countriesDiv;
export let sliderDot = sliderDotDiv;

// name
// nativeName
// population
// region
// subregion
// capital
// borders[]
// topLevelDomain[0]
// currencies.name
// languages[].name


// name
// Population
// Region
// Capital