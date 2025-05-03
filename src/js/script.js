
jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  // ハンバーガーメニュー (`.js-hamburger`) またはドロワーメニュー (`.js-drawer`) がクリックされたときの処理
  $(".js-hamburger, .js-drawer").click(function () {

    // `.js-hamburger` に `is-active` クラスを追加・削除（トグル）する
    // → メニューの開閉状態を視覚的に切り替えるためのクラス
    $(".js-hamburger, .js-header").toggleClass("is-active");

    if ($(".js-hamburger").hasClass("is-active")) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "auto");
    }

    // `.js-drawer` をフェードイン・フェードアウト（ゆっくり表示・非表示）を切り替える
    $(".js-drawer").fadeToggle();
  });
});

  //pc画面幅ではドロワーメニューを非表示にする
  // ウィンドウのサイズが変更されたときに、この関数が実行される
 $(window).resize(function () {

   // もしウィンドウの横幅が768ピクセル以上（=PCサイズの画面）だったら
   if ($(window).width() >= 768) {

     // ドロワーメニュー（スマホ用メニュー）を閉じる：クラス「is-active」を削除し、スタイルを初期化する
     $(".js-drawer").removeClass("is-active").css("display", "");

     // ヘッダーの開閉状態をリセット：クラス「is-active」を削除し、スタイルを初期化する
     $(".js-header").removeClass("is-active").css("display", "");
   }
 });


var mvSwiper = new Swiper(".js-mv-swiper", {
  loop: true,
  effect: "fade",
  speed: 3000,
  allowTouchMove: false,
  // autoplay: {
  //   delay: 3000,
  // },
});


var campaignSwiper = new Swiper(".js-campaign-swiper", {
  navigation:{
   nextEl:".campaign__swiper-button-next",
   prevEl:".campaign__swiper-button-prev",
  },
  loop: true,
  effect: "card",
  speed: 3000,
  spaceBetween: 24,
  slidesPerView: 1.2,
  autoplay: {
    delay: 3000,
  },
  breakpoints:{
    768:{
      spaceBetween:40,
      slidesPerView: 3.01,
      autoplay:false,
    }
  },
});



$(function () {
  const pageTop = $(".js-page-top");
  pageTop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 20) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  });
  pageTop.click(function () {
    $("body, html").animate(
      {
        scrollTop: 0,
      },
      300
    );
    return false;
  });
});
