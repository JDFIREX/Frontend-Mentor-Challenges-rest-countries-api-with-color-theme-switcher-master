import * as Search from "./main/search.js"
import * as Countries from "./main/countriesList.js"
import * as Detail from "./main/detail.js"
let mainDiv = document.createElement("div");
mainDiv.classList.add("main");
mainDiv.appendChild(Search.div)
mainDiv.appendChild(Countries.sliderDot)
mainDiv.appendChild(Countries.leftArrow)
mainDiv.appendChild(Countries.rightArrow)
mainDiv.appendChild(Countries.div)
mainDiv.appendChild(Detail.div)

export let div = mainDiv;