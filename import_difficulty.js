

// run this on any kattis problems page

let names = document.querySelectorAll(".table2 tbody tr td:nth-child(1) a")
let diff_number = document.querySelectorAll(".difficulty_number")

export let prob_map = new Map()
let n = [];
for (let i of names){
    n.push(i.innerHTML)
}
let p = []
for (let i of diff_number){
    p.push(i.innerHTML)
}

for (let i = 0; i < n.length;i++){
    prob_map.set(n[i],p[i]);
}

