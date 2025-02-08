
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  $(".js-hamburger,.js-drawer").click(function () {
    $(".js-hamburger").toggleClass("is-active");
    $(".js-drawer").fadeToggle();
  });
});

// var mvSwiper = new Swiper(".js-mv-swiper", {
//   loop: true,
//   effect: "fade",
//   speed: 3000,
//   allowTouchMove: false,
//   autoplay: {
//     delay: 3000,
//   },
// });

var campaignSwiper = new Swiper(".js-campaign-swiper", {
  navigation:{
   nextEl:".campaign__button-next",
   prevEl:".campaign__button-prev",
  },
  loop: true,
  effect: "card",
  speed: 300,
  spaceBetween: 24,
  slidesPerView: 1.2,
  breakpoints:{
    768:{
      spaceBetween:40,
      slidesPerView: 3.05,
    }
  },
  // centeredSliders: true,
  // allowTouchMove: false,
  // autoplay: {
  //   delay: 3000,
  // },
});