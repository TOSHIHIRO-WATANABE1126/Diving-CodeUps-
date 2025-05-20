
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
  autoplay: {
    delay: 3000,
  },
});


var campaignSwiper = new Swiper(".js-campaign-swiper", {
  navigation:{
   nextEl:".campaign__swiper-button-next",
   prevEl:".campaign__swiper-button-prev",
  },
  loop: true,
  speed: 2000,
  slidesPerView: "auto",
//  slidesPerView: 1.2,
  spaceBetween: 26,
  // loopedSlides: 5,
  // loopAdditionalSlides: 10,

  autoplay: {
    delay: 3000,
  },
  // width:280,
  breakpoints:{
    768:{
      spaceBetween:40,
      slidesPerView: "auto",
      // slidesPerView: 3.01,
      autoplay:false
  // width:334
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

  // アニメーション
  var box = $(".colorbox"),   //.colorboxのクラスを持つすべての要素を取得し、jQueryオブジェクトに格納
    speed = 700;   //アニメーションのスピードを設定

  box.each(function () {   //取得したすべての.colorboxに対して処理を行う
    $(this).append('<div class="color"></div>');   //各.colorboxの中に新しい<div class="color"></div>を追加 この要素がアニメーションに使用される
    var color = $(this).find(".color"),   //追加した.colorを取得
      image = $(this).find("img");    //.colorbox内のimg要素を取得
    var counter = 0;   //一度だけアニメーションを実行するためのカウンター

    image.css("opacity", "0");  // 画像の透明度を0に設定し、非表示にする
    color.css("width", "0%");   // .colorの幅を0%に設定し、非表示にする
    color.on("inview", function () {   // .colorが画面内に入ったときの処理
      if (counter == 0) {   //カウンターが0のときのみアニメーションを実行
        $(this)
          .delay(200)
          .animate({ width: "100%" }, speed, function () {   //幅を100%にアニメーション
            image.css("opacity", "1");   // 画像の透明度を1に設定し、表示する
            $(this).css({ left: "auto", right: "0" });   //位置を調整
            $(this).animate({ width: "0%" }, speed);   //幅を0%に戻すアニメーション
          });
        counter = 1;   //カウンターを1に設定し、再度アニメーションが実行されないようにする
      }
    });
  });

 //モーダルウィンドウ
  $(document).ready(function () {
    // 変数に要素を格納
    var trigger = $(".js-gallery"),
      wrapper = $(".modal__wrapper"),
      layer = $(".modal__layer"),
      container = $(".modal__container"),
      content = $(".modal__content");

    // 『ギャラリーの画像』をクリックしたら、モーダルを開く
    $(trigger).click(function () {
      let imgSrc = $(this).find("img").attr("src"); // クリックした画像の src を取得
      let imgAlt = $(this).find("img").attr("alt"); // alt テキストを取得（アクセシビリティ向上）

      // モーダルに挿入する画像のHTMLを作成
      let modalImage = `<img src="${imgSrc}" alt="${imgAlt}" class="modal__image">`;

      // モーダル内に画像を挿入
      $(content).html(modalImage);

      $(wrapper).fadeIn(400); // モーダルを表示

      // スクロール位置を戻す
      $(container).scrollTop(0);

      // サイトのスクロールを禁止にする
      $("html, body").css("overflow", "hidden");
    });

    // 『背景部分（モーダルのレイヤー）』をクリックしたら、モーダルを閉じる
    $(layer).click(function () {
      $(wrapper).fadeOut(400); // モーダルを非表示

      // サイトのスクロール禁止を解除
      $("html, body").css("overflow", "");
    });
  });

