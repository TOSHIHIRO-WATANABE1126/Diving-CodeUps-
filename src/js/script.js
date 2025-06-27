jQuery(function ($) {

  // ハンバーガーメニュー
    // ハンバーガーメニューとドロワーメニューのクリックイベントを設定
  $(".js-hamburger, .js-drawer").click(function(){

    // ①ハンバーガーメニューとヘッダーにis-activeクラスを付け外し（メニューの開閉状態を切り替え）
    $(".js-hamburger, .js-header").toggleClass("is-active");

    // ②メニューが開いている場合（is-activeクラスが付いている場合）
    if($(".js-hamburger").hasClass("is-active")) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "auto");
    }

    // ③ドロワーメニューをフェードイン/アウトで表示/非表示
    $(".js-drawer").fadeToggle();
  });

  // キーボード操作のサポート
  $(".js-hamburger").on("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      $(this).trigger("click");
    }
  });

  // pc画面幅ではドロワーメニューを非表示にする
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

  // mvスライダー
  const mvSwiper = new Swiper(".js-mv-swiper", {
    // スライダーを無限ループさせる設定
    loop: true,
    // フェードエフェクトを適用（スライドが切り替わる際にフェードイン/アウトする）
    effect: "fade",
    // スライドの切り替えアニメーションの速度を3000ミリ秒（3秒）に設定
    speed: 3000,
    // タッチ操作（スワイプ）を無効化
    allowTouchMove: false,
    // 自動再生の設定
    autoplay: {
      // スライドの表示時間を3000ミリ秒（3秒）に設定
      delay: 3000,
    },
  });

  // キャンペーンスライダー
  // キャンペーンセクションのスライダーを初期化
  const campaignSwiper = new Swiper(".js-campaign-swiper", {
    // ナビゲーションボタン（前へ・次へ）の設定
    navigation: {
    nextEl: ".campaign__swiper-button-next", // 次へボタンの要素を指定
    prevEl: ".campaign__swiper-button-prev", // 前へボタンの要素を指定
    disabledClass: "swiper-button-disabled", // 無効化時のクラス名を指定
    },
    loop: true, // スライダーを無限ループさせる
    speed: 800, // スライド切り替えのアニメーション速度を800ミリ秒に設定
    slidesPerView: "auto", // 表示するスライド数を自動調整
    spaceBetween: 26, // スライド間の間隔を26ピクセルに設定
    // スマートフォン表示時（768px未満）のみ自動再生を有効化
    autoplay: window.innerWidth < 768 ? {
      delay: 3000, // 3秒ごとにスライドを切り替え
      disableOnInteraction: false, // ユーザーの操作後も自動再生を継続
      pauseOnMouseEnter: true, // マウスホバー時に自動再生を一時停止
    } : false,
    // アクセシビリティ対応の設定
    a11y: {
      prevSlideMessage: "前のスライド", // 前へボタンのスクリーンリーダー用テキスト
      nextSlideMessage: "次のスライド", // 次へボタンのスクリーンリーダー用テキスト
    },
    // レスポンシブ対応の設定
    breakpoints: {
      768: { // 768px以上の画面幅の場合
        spaceBetween: 40, // スライド間の間隔を40ピクセルに変更
        slidesPerView: "auto", // 表示するスライド数を自動調整
        autoplay: false, // 自動再生を無効化
      }
    },
    watchSlidesProgress: true, // スライドの進行状況を監視
    preventInteractionOnTransition: true, // スライド切り替え中は操作を防止
  });

  // ウィンドウリサイズ時にautoplayの設定を更新
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      campaignSwiper.autoplay.stop();
    } else {
      campaignSwiper.autoplay.start();
    }
  });

  // アニメーション
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

  // カラーボックス
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

  // モーダルウィンドウ
  $(document).ready(function () {
    // 変数に要素を格納
    var trigger = $(".js-gallery-photo"),
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

  // タブ
  $(document).ready(function () {
    $('.menu-button, .menu-button span').click(function (e) {
      e.stopPropagation(); // イベントの伝播を停止
      const $button = $(this).hasClass('menu-button') ? $(this) : $(this).closest('.menu-button');

      // すべてのタブボタンから is-active を外す
      $('.menu-button').removeClass('is-active');
      // クリックされたタブボタンに is-active をつける
      $button.addClass('is-active');

      // すべてのタブ内容から is-active を外す
      $('.info-content--page-info').removeClass('is-active');
      // クリックされたボタンの data-tab の値を取得
      let target = $button.data('tab');
      // そのIDのコンテンツに is-active をつける
      $('#' + target).addClass('is-active');
    });
  });

  // アーカイブ
  $(document).ready(function () {
    $(".side-archive-item__toggle").click(function () {
      $(this).toggleClass("is-open"); // 三角の向きを変更
      $(this).next(".side-archive-item__list").slideToggle(); // リストの表示・非表示
    });
  });

  // アコーディオン
  $(function () {
    $('.accordion__title').on('click', function () {
      $(this).toggleClass("is-open"); // 三角の向きを変更
      // タイトルがクリックされたら、次の .accordion__content を開閉
      $(this).next('.accordion__content').slideToggle(300);
    });
  });

  // チェックボックス
  $(function(){
    // チェックボックスの処理を一度だけ実行するようにする
    $('.form-item__checkbox').on('click', function(e) {
      const $checkbox = $(this).find('.form-item__checkbox-input');
      const isChecked = $checkbox.prop('checked');

      // すべてのチェックボックスのチェックを外す
      $('.form-item__checkbox-input').prop('checked', false);

      // クリックされたチェックボックスだけをチェックする
      if (!isChecked) {
        $checkbox.prop('checked', true);
      }

      // チェックボックスの状態に応じてスタイルを更新
      $('.form-item__checkbox-text').removeClass('is-checked');
      if (!isChecked) {
        $(this).find('.form-item__checkbox-text').addClass('is-checked');
      }
    });
  });

  // フォーム
  $(function(){
    // #nameの入力欄がフォーカスを失った時の処理
     $('#name').on('blur', function() {
       // 入力値を取得し、前後の空白を除去して空かどうか判定
       if ($('#name').val().trim() === "") {
         // 空の場合、エラーメッセージを表示
         $('#name-error').show();
         // 入力欄にエラー用クラスを追加
         $('#name').addClass('input-error');
       } else {
         // 入力がある場合、エラーメッセージを非表示
         $('#name-error').hide();
         // 入力欄からエラー用クラスを削除
         $('#name').removeClass('input-error');
       }
    });
   });

});