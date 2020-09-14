//Vars

let menuContainer = document.getElementById("menuContainer")
let menuOpen = false;
let listOpen = false;

let payButton = document.createElement("div");
payButton.classList.add("row","col-md-12", "justify-content-center");

let ID = 42571;
let listID = 0;
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
let tmpPayButton = `
<div>

<div class="containerx">
<div class="left-side">
 <div class="card">
  <div class="card-line"></div>
  <div class="buttons"></div>
 </div>
 <div class="post">
  <div class="post-line"></div>
  <div class="screen">
   <div class="dollar">$</div>
  </div>
  <div class="numbers"></div>
  <div class="numbers-line2"></div>
 </div>
</div>
<div class="right-side">
 <div class="new">Pay $</div>
 
  <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 451.846 451.847"><path d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#cfcfcf"/></svg>

</div>
</div>

</div>
`;

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
        <div class="row col-md-6 m-2 p-4">
            <label for="number">How many items?</label>
            <input type="number" name="number" value=1 min=1 max=10 id="nItems">
        </div>
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
    
        </div>
        `;

        this.newListElement = document.createElement("div"); 
        this.newListElement.classList.add("newListElement", "col-md-2");
        takeAwayList.appendChild(this.newListElement);
        this.newListElement.innerHTML += tmpTakeAway;
        takeAwayList.appendChild(payButton);


        this.destroyButton = document.createElement("button");
        this.destroyButton.innerHTML="X";
        this.newListElement.appendChild(this.destroyButton);
        this.destroyButton.addEventListener("click", ()=>{
            this.destroy();
        })
        
    }

    destroy(){
        listID--;
        takeAwayList.removeChild(this.newListElement);
        newLE.pop();
        delete this;
    }

}


//==================================================//
//Saving data
function getData(arrOfObjs){
    actualData = arrOfObjs;
  }

//==================================================//

//=========================================================//
//=========Take Away List======//

take = () =>{
    if(menuOpen){
            if(!listOpen){
                menuContainer.insertBefore(takeAwayList, menuCard);
                takeAwayList.innerHTML = tmpTakeAwayCont;


                listID++;
                newLE[listID] = new listElement(listID);


                payButton.innerHTML=tmpPayButton
                payButton.id = "buyButtonContainer";
                


                listOpen = true;
            }else{
               listID++;
               newLE[listID] = new listElement(listID);
               
            }

    }
}


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









