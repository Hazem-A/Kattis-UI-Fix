
let container = document.getElementsByClassName("attribute_list-book")[0]

let diff = document.createElement("div")
diff.setAttribute("class","attribute_list-item")
let s = document.createElement("span")
s.className="attribute_list-label"
s.innerHTML="Difficulty"
diff.appendChild(s)

(() => {
    chrome.runtime.onMessage.addListener((obj,sender,response) =>{
        const {prob_map} = obj;
        let prob_name = document.getElementsByClassName("book-page-heading")[0].innerHTML;
        if (prob_map.has(prob_name)){
            let s2 = document.createElement("span")
// check to see if the problem name is in the map
            let diff_num = prob_map.get(prob_name);
            s2.innerHTML=diff_num;
            if (diff_num <=2.7){
                s2.className = "difficulty_number difficulty_number-problems_table difficulty_easy";
                diff.appendChild(s2)
                let s3 = document.createElement("span")
                s3.innerHTML = "easy"
                diff.appendChild(s3)
            } else if (diff <= 5.4){
                s2.className = "difficulty_number difficulty_number-problems_table difficulty_medium";
                diff.appendChild(s2)
                let s3 = document.createElement("span")
                s3.innerHTML = "medium"
                diff.appendChild(s3)
            } else {
                s2.className = "difficulty_number difficulty_number-problems_table difficulty_hard";
                diff.appendChild(s2)
                let s3 = document.createElement("span")
                s3.innerHTML = "hard"
                diff.appendChild(s3)
            }
        }

    });
});



container.appendChild(diff)