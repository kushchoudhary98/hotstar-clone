import data from "./movies.json" assert { type:"json"}

let ex_nav = document.getElementById("extended_nav");
let nav = document.getElementsByTagName("navbar");
let nav_ico = document.getElementsByClassName("bi");
let curr_page_ico = document.getElementsByClassName("curr_page")[0];
curr_page_ico.style.opacity = "100%";

nav[0].addEventListener("mouseover", ()=>{
    ex_nav.style.width = "150px";
    for(let i = 0; i < 6; i++){
        nav_ico[i].style.opacity = "100%";
    }
    ex_nav.style.transition = "all 0.2s";
    document.getElementById("ex_nav-ul").style.display = "flex";
});

ex_nav.addEventListener("mouseleave", ()=>{
    ex_nav.style.width = "0px";
    for(let i = 0; i < 6; i++){
        nav_ico[i].style.opacity = "50%";
    }
    curr_page_ico.style.opacity = "100%";
    document.getElementById("ex_nav-ul").style.display = "none";
})

let mov_logo = document.getElementById("curr_show_logo");
let mov_date = document.getElementById("curr_show_specs");
let mov_desc = document.getElementById("curr_show_desc");

let curr_select = document.getElementsByClassName("swipper-curr")[0];
let all_select = document.getElementsByClassName("sc");

let bg = document.getElementsByTagName("main")[0];
let grad = document.getElementById("grad");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function change(t, mk_curr){
    let movie = data[t];
    mov_logo.src = "logo/" + t + ".png";
    mov_date.innerHTML = movie["year"] + mov_date.innerHTML.slice(5,);
    mov_desc.innerHTML = movie["desc"];
    let bckg = "linear-gradient(90deg, #0F1014ff, rgba(15, 16, 20, 0.9), rgba(15, 16, 20, 0.5),rgba(15, 16, 20, 0.1),#00000000), url('main_movies/" + t + ".jpg')"
    console.log(bckg);
    
    grad.style.transition = "all 0.5s";
    grad.style.backgroundColor = "#0F1014ff";
    await sleep(250);
    bg.style.backgroundImage = bckg;
    grad.style.backgroundColor = "#00000000";

    if(mk_curr != curr_select){
        curr_select.classList.replace("swipper-curr", "swipper-slide");
        mk_curr.classList.replace("swipper-slide", "swipper-curr");
        curr_select = document.getElementsByClassName("swipper-curr")[0];
    }
}

for(let i = 0; i < all_select.length; i++) {
    all_select[i].addEventListener("click",()=>{
        change(all_select[i].title, all_select[i]);
    });
}

function index(ele){
    for(let i = 0; i < all_select.length; i++){
        if(curr_select == all_select[i]) {
            return i;
        }
    }
}

setInterval(function(){
    let i = index(curr_select) + 1;
    if(i == all_select.length) i = 0;

    let t = all_select[i].title;
    change(t, all_select[i]);
}, 5000);