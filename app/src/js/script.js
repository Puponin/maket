window.onload = function(){
    
    var menuStyle = getComputedStyle(menuContent);        
    burger_btn.onclick = function(){
        if(menuStyle.left == "-250px"){
            menuContent.classList.add("active");
            burger_btn.classList.add("active");            
        }else{
            menuContent.classList.remove("active");
            burger_btn.classList.remove("active");                        
        }
    }  
   
    /* slider */
    var mark = document.querySelectorAll(".mark li"),
        slide = document.querySelectorAll(".slides .slides__slide");

    for (let i = 0; i < mark.length; i++) {
        mark[i].addEventListener("click", slider);
    }

    function slider() {
        for (let i = 0; i < mark.length; i++) {
            mark[i].style.background = '#ffffff';
            slide[i].classList.remove('active');
            if (mark[i] === this) {
                mark[i].style.background = '#00a0ff';
                slide[i].classList.add('active');
            }
        }
    }
    var slideIndex = 0;
    autoSlider();
    function autoSlider() {
        for (let i = 0; i < mark.length; i++) {
            mark[i].style.background = '#ffffff';
            slide[i].classList.remove('active');
        }
        slideIndex++;
        if (slideIndex > slide.length) {
            slideIndex = 1;
        }
        mark[slideIndex - 1].style.background = '#00a0ff';
        slide[slideIndex - 1].classList.add('active');        
        setTimeout(autoSlider, 4000);
    }    
    
    /* end slider */
}

$(function (){
    
})
