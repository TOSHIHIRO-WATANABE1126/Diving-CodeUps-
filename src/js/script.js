
jQuery(function ($) {
  // `$` を jQuery オブジェクトとして安全に使用できるようにする

  // ハンバーガーメニュー (`.js-hamburger`) またはドロワーメニュー (`.js-drawer`) がクリックされたときの処理
  $(".js-hamburger, .js-drawer").click(function () {
    
    // `.js-hamburger` に `is-active` クラスを追加・削除（トグル）する
    // → メニューの開閉状態を視覚的に切り替えるためのクラス
    $(".js-hamburger").toggleClass("is-active");

    // `.js-drawer` をフェードイン・フェードアウト（ゆっくり表示・非表示）を切り替える
    $(".js-drawer").fadeToggle();
  });
});

$(window).on("resize", function () {
  // 画面サイズが変更されたとき（resize イベントが発生したとき）の処理

  // `window.matchMedia("(min-width: 768px)").matches` で PCサイズ（768px以上）かどうかを判定
  if (window.matchMedia("(min-width: 768px)").matches) {
    
    // ハンバーガーメニューの `is-active` クラスを削除（開いていたら閉じる）
    $(".js-hamburger").removeClass("is-active");

    // ドロワーメニュー（ナビゲーションメニュー）をフェードアウト（非表示にする）
    $(".js-drawer").fadeOut();
  }
});


  // // ハンバーガーメニューリサイズで閉じる
  // $(window).on('resize', function() {
  //   $(".js-header").removeClass("js-open");
  //   $('.js-hamburger').removeClass('js-open');
  //   $('.js-sp-nav').removeClass('js-open');
  //   $("body").removeClass("noscroll");
  //   });

  //   // リンククリック時にメニューを閉じる処理
  //   $(".js-sp-nav a").click(function () {
  //       $(".js-hamburger").removeClass("js-open"); // ハンバーガーアイコンの状態をリセット
  //       $(".js-sp-nav").removeClass("js-open");   // メニューを非表示に
  //       $("body").removeClass("noscroll");        // スクロールロックを解除
  //   });

// jQuery(function ($) {
//   // $ を jQuery のエイリアスとして使用する
//   // jQuery を安全に実行するための基本的な書き方

//   function toggleDrawerDisplay() {
//     // 現在のウィンドウ幅を取得
//     var windowWidth = $(window).width();
    
//     // 768px以上（PCサイズ）の場合は `.js-drawer` を非表示
//     if (windowWidth >= 768) {
//       $(".js-drawer").hide(); // `display: none;` と同じ効果
//     } else {
//       // 767px以下（タブレット・スマホサイズ）の場合は `.js-drawer` を表示
//       $(".js-drawer").show(); // `display: block;` の状態にする
//     }
//   }

//   // ウィンドウサイズが変更されたときに `toggleDrawerDisplay()` を実行
//   $(window).resize(function () {
//     toggleDrawerDisplay();
//   });
// });



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
   nextEl:".campaign__button-next",
   prevEl:".campaign__button-prev",
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

// 画像のスライドアニメーション
// ① アニメーションをつける要素（.js-slide-animation）を全部探す
var box = $('.js-slide-animation');

// ② アニメーションの速さを 700 ミリ秒（0.7秒）にする
var speed = 700;

// ③ すべての .js-slide-animation に対して、1つずつ処理をする
box.each(function(){

  // ④ .js-slide-animation の中に、新しく <div class="slide-animation__bg"></div> を追加する
  //    これは黒いバーの部分になる
  $(this).append('<div class="slide-animation__bg"></div>');

  // ⑤ 追加した黒いバー（.slide-animation__bg）を探して、変数 color に入れる
  var color = $(this).find('.slide-animation__bg');

  // ⑥ 画像（.slide-animation__img）を探して、変数 image に入れる
  var image = $(this).find('.slide-animation__img');

  // ⑦ アニメーションが1回だけ動くようにするためのカウンター（最初は0）
  var counter = 0;

  // ⑧ 最初は画像を見えなくする（透明にする）
  image.css('opacity','0');

  // ⑨ 最初は黒いバーの幅を 0% にして、見えないようにする
  color.css('width','0%');

  // ⑩ 画面の中に黒いバーが入ったときに、アニメーションを実行する
  color.on('inview', function(){
    
    // ⑪ アニメーションがまだ動いていない（counter が 0 のとき）だけ実行する
    if(counter == 0){

      // ⑫ 0.2秒（200ミリ秒）待ってから、黒いバーを左から右へスライドさせる
      $(this).delay(200).animate({'width':'100%'}, speed, function(){

        // ⑬ 黒いバーが画面いっぱいになったら、画像を見えるようにする（透明を解除）
        image.css('opacity','1');

        // ⑭ 黒いバーの位置を左側に固定する
        $(this).css({'left':'0','right':'auto'});

        // ⑮ 黒いバーを今度は右から左へスライドさせて消す
        $(this).animate({'width':'0%'}, speed);
      });

      // ⑯ アニメーションが1回だけ実行されるように、カウンターを1にする
      counter = 1;
    }
  });
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