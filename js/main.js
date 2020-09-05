//Vars

let menuContainer = document.getElementById("menuContainer")
let menuOpen = false;

//Texts
let desctitle = document.getElementById("desc-h");
let descp1 = document.getElementById("desc-p1");

//Btn
goMenu = document.getElementById("goMenu");
//
li3 = document.getElementById("li3");

let menuCard = document.createElement("div");
menuCard.classList.add("animate__animated", "animate__bounceIn", "menuCard", "col-md-6", "container");
//==================================================//

let tmpMenu = ``;
class foodAPI{
    constructor(id){

        this.APIkey = "?apiKey=ff520b1d28314b6e9bdf7762b4908f11";
        this.APIquery = "";
        this.keyID = id;
        this.APIroot = "food/menuItems/"+this.keyID;
        this.APIlink = "https://api.spoonacular.com/" + this.APIroot + this.APIkey + this.APIquery;

    }

    getFood(){
        fetch(this.APIlink)
        .then(res => res.json())
        .then(data =>{
            console.log(data);

            let desc = "No description";
            if(data.description != undefined || data.description != null)
            {
                desc = data.description;
            }

            //
    tmpMenu = `
    <h2> Menu </h2>
    <div>
    <h6 class="p-4">${data.title}</h6>  

    <p id="dataDescription">${desc}...</p>
    <div class="container col-md-6"><img src="${data.images[0]}" alt=""></div>
    </div>
    `;

    menuContainer.appendChild(menuCard);
    menuCard.innerHTML = tmpMenu;
        })
    }
} 


//==================================================//

//===Scroll Detection===//
// Detectamos cuando el usuario desplace la pantalla
window.onscroll = function (){
    let scroll = document.documentElement.scrollTop || document.body.scrollTop;
    if(scroll > 50 && scroll < 100){

        descp1.style.fontSize="17px";
        
        desctitle.classList.add("animate__animated","animate__jello");
        desctitle.style.animationDuration = "2s";

        descp1.classList.add("animate__animated","animate__heartBeat");
        descp1.style.animationDelay = "0.5s";
        descp1.style.animationName = "aSize";
        descp1.style.animationDuration = "1s";

    }

}
//==================================================//
//======Hamburguers Anim=========//
let point = document.getElementsByClassName("point");


setInterval(() => {
        let anim = 'animate__wobble';
        for (let i = 0; i < 3; i++) {
            if(point[i].classList.contains(anim) ){
                point[i].classList.remove(anim)
            }
            else{
                point[i].classList.add("animate__animated", anim);
            }
        }

}, 1000);

//=====Little blur effect in transition========//

li3.addEventListener("click", ()=>{
    document.body.style.filter = "blur(3px)";
    setTimeout(() => {
        let blur = 3;
        for (let i = 0; i < blur; i+=0.1) {
            blur-=1;
            document.body.style.filter = "blur("+blur+"px)";            
        }
    }, 200);
})


//===Carousel==///
$('.carousel').carousel();
$('.carousel').carousel({
    interval: 20,
  });
//=============//


//=====Take Away Menu========//


goMenu.addEventListener("click", ()=>{
    if(!menuOpen){
        foodapi = new foodAPI(42571);
        foodapi.getFood();

       menuOpen = true;



    }else{
        menuContainer.removeChild(menuCard);
        menuOpen = false;
    }
})