
// add the difficulty back into kattis
import {prob_map} from "./import_difficulty";
let container = document.getElementsByClassName("attribute_list-book")[0]

let diff = document.createElement("div")
diff.setAttribute("class","attribute_list-item")
let s = document.createElement("span")
s.className="attribute_list-label"
s.innerHTML="Difficulty"
diff.appendChild(s)

let prob_name = document.getElementsByClassName("book-page-heading")
if (prob_map.has(prob_name)){
  let s2 = document.createElement("span")
// check to see if the problem name is in the map
let diff_num = prob_map.get(prob_name);
}



container.appendChild(diff)
