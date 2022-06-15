
// add the difficulty back into kattis

let container = document.getElementsByClassName("attribute_list-book")[0]

let diff = document.createElement("div")
diff.setAttribute("class","attribute_list-item")
container.appendChild(diff)

let s = document.createElement("span")
let d = container.getElementsByClassName("attribute_list-item")[6]
s.className="attribute_list-label"
s.innerHTML="Difficulty"
d.appendChild(s)
