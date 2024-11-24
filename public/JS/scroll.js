const swiperEl = document.querySelector('swiper-container')
    Object.assign(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        "@0.00": {
          slidesPerView: 2,
          spaceBetween: 2,
        },
        "@0.75": {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        "@1.00": {
          slidesPerView: 5,
          spaceBetween: 40,
        },
        "@1.50": {
          slidesPerView: 6,
          spaceBetween: -10,
        },
      },
    });

    swiperEl.initialize();

  let AlltoggleTax = document.querySelectorAll("#flexSwitchCheckDefault")
  AlltoggleTax.forEach((toggleTax) => {
  toggleTax.addEventListener("click",()=>{
    let taxinfo = document.getElementsByClassName("tax-info");
    for(info of taxinfo){
      if(info.style.display != "inline"){
        info.style.display = "inline";
      }else{
        info.style.display = "none";
      }
    }
  })
});



  
