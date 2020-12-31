import * as Search from "./main/search.js"

let mainDiv = document.createElement("div");
mainDiv.classList.add("main");
mainDiv.appendChild(Search.div)

export let div = mainDiv;