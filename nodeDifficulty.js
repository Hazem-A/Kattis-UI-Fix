

const puppeteer = require('puppeteer')
const fs = require('fs/promises')



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

let s2= document.createElement("span")
let s3=document.createElement("span")
let kattis = document.getElementsByClassName("book-page-heading")[0];

const prob_name = kattis.innerHTML;

let dif = start(prob_name)

s2.innerHTML=dif;

if (dif <= 2.7){
    s2.className = "difficulty_number difficulty_number-problems_table difficulty_easy"
    d.appendChild(s2)
    s3.innerHTML="easy"
    d.appendChild(s3)
} else if (dif <= 5.4){
    s2.className = "difficulty_number difficulty_number-problems_table difficulty_medium"
    d.appendChild(s2)
    s3.innerHTML="medium"
    d.appendChild(s3)
} else {
    s2.className = "difficulty_number difficulty_number-problems_table difficulty_hard"
    d.appendChild(s2)
    s3.innerHTML="hard"
    d.appendChild(s3)
}
async function start(name){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const prob_page = "https://open.kattis.com/problems?page="

    // use binary search to find the problem difficulty
    let low = 0;
    let high = 33;
    let mid = Math.floor((low+high)/2)

    let difficulty = 0;
    let pg = -1;

    while (low !== high){
        let temp = prob_page + toString(mid)
        await page.goto(temp,{waitUntil:'networkidle2'})

        let tab =await page.evaluate( ()=> {
            let dif = Array.from(document.querySelectorAll(".difficulty_number")).map(x =>x.textContent)
            let prob = Array.from(document.querySelectorAll(".table2 tbody tr td:nth-child(1) a")).map(x =>x.textContent)
            return {dif,prob}

        })
        if (prob[0] > name){
            high = mid-1;
            mid = Math.floor((low+high)/2)
        } else if (prob[prob.length-1] > name){
            low = mid+1;
            mid = Math.floor((low+high)/2)
        } else {
            pg = mid
            break
        }
    }

    if (pg === -1){
        pg=mid
    }


    // do another binary search within the page
    let temp = prob_page + toString(mid)

    low=0
    high=99
    mid=Math.floor((low+high)/2)
    await page.goto(temp,{waitUntil:'networkidle2'})
    let tab =await page.evaluate( ()=> {
        let dif = Array.from(document.querySelectorAll(".difficulty_number")).map(x =>x.textContent)
        let prob = Array.from(document.querySelectorAll(".table2 tbody tr td:nth-child(1) a")).map(x =>x.textContent)
        return {dif,prob}
    })


    while (low !== high){
        if (tab.prob[mid]===name){
            difficulty=tab.dif[mid];
            break;
        }

        if(tab.prob[mid] > name){
            high=mid-1;
            mid = Math.floor((low+high)/2)
        } else {
            low=mid+1;
            mid = Math.floor((low+high)/2)
        }
    }

    if (difficulty===0){
        difficulty=tab.dif[mid]
    }
    // use binary search to find the difficulty

    await browser.close()
    return difficulty
}






