//===Carousel==///
$('.carousel').carousel();
$('.carousel').carousel({
    interval: 20,
  });

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

//=================Tilt.js=======================//

$('.cCarousel').tilt({
    perspective: 500,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    speed: 300,
    scale: 0.8
})