//Vars

let menuContainer = document.getElementById("menuContainer")
let menuOpen = false;
let listOpen = false;

let ID = 42571;
let listID = 0;
let newListElement = [];
let newLE = [];
let actualData = [];

let point = document.getElementsByClassName("point");

//Texts
let desctitle = document.getElementById("desc-h");
let descp1 = document.getElementById("desc-p1");

//Btn

goMenu = document.getElementById("goMenu");
//
li3 = document.getElementById("li3");

//Templates
let tmpMenu = ``;
let tmpTakeAway = ``;
let tmpTakeAwayCont = `<h2 class="text-center"> Products List </h2>`;

//Elements Creation
let menuCard = document.createElement("div");
menuCard.classList.add("animate__animated", "animate__fadeIn", "menuCard", "col-md-6", "container");

let takeAwayList = document.createElement("div");
takeAwayList.classList.add("takeAwayList", "col-md-6"); 


//==================================================//

class foodAPI{
    constructor(id){

        this.APIkey = "?apiKey=ff520b1d28314b6e9bdf7762b4908f11";
        this.APIquery = "";
        this.keyID = id;
        this.APIroot = "food/menuItems/"+this.keyID;
        this.APIlink = "https://api.spoonacular.com/" + this.APIroot + this.APIkey + this.APIquery;
        this.obj;

    }
    getFood(callback){
        fetch(this.APIlink)
        .then(res => res.json())
        .then(data =>{
            this.obj = data;
            console.log(data);

            let desc = "No description";
            let price = Math.floor(Math.random() * 20) + "$";
            if(data.description != undefined || data.description != null)
            {
                desc = data.description;
            }
            if(data.price != undefined || data.price != null)
            {
                price = data.price + "$";
            }

            //
    tmpMenu = `
    <h2> Menu </h2>
    <div class="container">
        <h6 class="p-4 text-center">${data.title}</h6>  
        <p class="text-center text-success">${price}</p>  

        <p id="dataDescription">${desc}...</p>
        <div class="container col-md-6"><img src="${data.images[0]}" alt=""></div>
    </div>
    <div class="row justify-content-center p-4 col-md-12">
        <button onclick="prev()">Previous</button> 
        <button id="take" onclick="take()">Take it!</button> 
        <button onclick="next()">Next</button>
    </div>
    `;



    menuContainer.appendChild(menuCard);
    menuCard.innerHTML = tmpMenu;
        })
    .then(() => callback(this.obj))
    }
} 

//==================================================//
//=====Elements in the products list======//

class listElement{
    constructor(id){
        this.id = id;

        tmpTakeAway=`
        <div class="row newListElement col-md-2 p-2">
            <img src="${actualData.images[0]}" alt="">
            <button id="destroyButton">X</button>
    
                        
        </div>
        `;

        newListElement[this.id] = document.createElement("div"); 
        newListElement[this.id].classList.add("newListElement");
        takeAwayList.appendChild(newListElement[this.id]);
        newListElement[this.id].innerHTML += tmpTakeAway;

        this.destroyButton = document.getElementById("destroyButton");
        this.destroyButton.addEventListener("click", ()=>{
            this.destroy();
        })
        
    }

    destroy(){
        alert(this.id)
        takeAwayList.removeChild(newListElement[this.id]);
        newLE.pop();
        listID--;
    }

}


//==================================================//
//Saving API data in a variable//

function getData(arrOfObjs){
    actualData = arrOfObjs;
  }

//=========================================================//
//=========Take Away List======//

take = () =>{
    if(menuOpen){
            if(!listOpen){
                menuContainer.insertBefore(takeAwayList, menuCard);
                takeAwayList.innerHTML = tmpTakeAwayCont;

                listID++;
                newLE[listID] = new listElement(listID);

                console.log(listID + " "+newLE+ " "+newLE.length); 

                listOpen = false;
            }else{
               listID++;
               newLE[listID] = new listElement(listID);
               
               console.log(listID + " "+newLE+ " "+newLE.length); 
            }

    }
}

//=========================================================//
//===Scroll Detection===//
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
next = () =>{
    menuContainer.removeChild(menuCard);
    foodapi = new foodAPI(ID+=2);
    foodapi.getFood(getData);

}

prev = () =>{
    menuContainer.removeChild(menuCard);
    foodapi = new foodAPI(ID-=2);
    foodapi.getFood(getData);
}

goMenu.addEventListener("click", ()=>{
    if(!menuOpen){
        foodapi = new foodAPI(ID);
        foodapi.getFood(getData);

       menuOpen = true;



    }else{
        menuContainer.removeChild(menuCard);
        menuOpen = false;
    }
})









