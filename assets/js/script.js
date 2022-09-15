/* libs start */
;(function() {
  var canUseWebP = function() {
    var elem = document.createElement('canvas');

    if (!!(elem.getContext && elem.getContext('2d'))) {
        // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }

    // very old browser like IE 8, canvas not supported
    return false;
  };
  
  var isWebpSupported = canUseWebP();

  if (isWebpSupported === false) {
    var lazyItems = document.querySelectorAll('[data-src-replace-webp]');

    for (var i = 0; i < lazyItems.length; i += 1) {
      var item = lazyItems[i];

      var dataSrcReplaceWebp = item.getAttribute('data-src-replace-webp');
      if (dataSrcReplaceWebp !== null) {
        item.setAttribute('data-src', dataSrcReplaceWebp);
      }
    }
  }

  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });
})();
/* libs end */

/* myLib start */
;(function() {
  window.myLib = {};

  window.myLib.body = document.querySelector('body');

  window.myLib.closestAttr = function(item, attr) {
    var node = item;

    while(node) {
      var attrValue = node.getAttribute(attr);
      if (attrValue) {
        return attrValue;
      }

      node = node.parentElement;
    }

    return null;
  };

  window.myLib.closestItemByClass = function(item, className) {
    var node = item;

    while(node) {
      if (node.classList.contains(className)) {
        return node;
      }

      node = node.parentElement;
    }

    return null;
  };

  window.myLib.toggleScroll = function() {
    myLib.body.classList.toggle('no-scroll');
  };
})();
/* myLib end */

// ---------------------------------------------------------------------





// ---------------------------------------------------------------------



var players = new Array();

$(document).ready(function () {
  $(document).on("click", ".yt-toggle-play", function () {
    var playBtn = $(this);
    var plBlock = playBtn.closest(".video-bl");
    var videoBlockId = plBlock.find(".embed-responsive-item").attr("id");

    playBtn.addClass("in-process");

    // Сначала останавливаем все плееры
    $(players).each(function () {
      let state = this.getPlayerState();

      if (state === 1) {
        this.pauseVideo();
      }

      $("#" + this.videoBlockId)
        .closest(".video-bl")
        .find(".yt-toggle-play")
        .removeClass("c-hide");
    });

    // Если плеер уже инициализирован
    if (plBlock.find("iframe").length) {
      $(players).each(function () {
        if (this.videoBlockId == videoBlockId) {
          var state = this.getPlayerState();

          if (state === 1) {
            this.pauseVideo();
            playBtn.removeClass("c-hide");
          } else {
            playBtn.addClass("c-hide");
            this.playVideo();
          }
        }
      });
      playBtn.removeClass("in-process");

      // Иначе инициализируем
    } else {
      var videoID = plBlock.data("video");

      var player = new YT.Player(videoBlockId, {
        playerVars: {
          controls: 0,
          showinfo: 0,
          rel: 0,
          autoplay: 0,
        },
        videoId: videoID,
      });

      player.videoBlockId = videoBlockId;

      players.push(player);

      var playVideoInt = setInterval(function () {
        $(players).each(function () {
          if (this.videoBlockId == videoBlockId && this.getPlayerState()) {
            clearInterval(playVideoInt);

            playBtn.addClass("c-hide");

            var state = this.getPlayerState();

            if (state === 1) {
              this.pauseVideo();
            } else {
              this.playVideo();
            }
          }
        });
        playBtn.removeClass("in-process");
      }, 200);
    }
  });
});

function onYouTubeIframeAPIReady() {
  $(".video-bl").each(function (key) {
    let videoID = $(this).data("video");
    let bgImage = $(this).data("bg");
    let videoBlockId = "player" + key;

    if (!videoID) {
      return false;
    }

    if (bgImage) {
      var bgImageUrl = bgImage;
    } else {
      var bgImageUrl = "https://img.youtube.com/vi/" + videoID + "/0.jpg";
    }

    $(this).html(
      '<div class="embed-responsive embed-responsive-16by9"><div class="embed-responsive-item" id="' +
      videoBlockId +
      '"></div><div class="yt-toggle-play" style="background-image: url(' +
      bgImageUrl +
      ')"><svg width="100%" height="100%" viewBox="0 0 585 430" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_122_4)"><mask id="mask0_122_4" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="30" y="30" width="555" height="350"><rect x="30" y="30" width="554.494" height="350" rx="10" fill="#C4C4C4"/></mask><g mask="url(#mask0_122_4)"><path d="M30 40C30 34.4772 34.4772 30 40 30H182.89C186.176 30 189.252 31.6141 191.119 34.3179L418.991 364.318C423.571 370.951 418.823 380 410.762 380H40C34.4772 380 30 375.523 30 370V40Z" fill="#0B449E" fill-opacity="0.9"/></g></g><path d="M322.606 195.401C329.134 199.275 329.134 208.725 322.606 212.6L301.128 225.347C294.462 229.303 286.024 224.499 286.024 216.747L286.024 191.253C286.024 183.501 294.462 178.697 301.128 182.653L322.606 195.401Z" fill="white"/><path opacity="0.8" d="M361 204C361 237.137 334.868 264 302.632 264C270.397 264 244.264 237.137 244.264 204C244.264 170.863 270.397 144 302.632 144C334.868 144 361 170.863 361 204Z" fill="#E6E6E6"/><defs><filter id="filter0_d_122_4" x="0" y="0" width="470.779" height="430" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="10" dy="10"/><feGaussianBlur stdDeviation="20"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_122_4"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_122_4" result="shape"/></filter></defs> </svg></div></div>'
    );
  });
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



/* popup start */
; (function () {
  var showPopup = function (target) {
    target.classList.add('is-active');
  };

  var closePopup = function (target) {
    target.classList.remove('is-active');
  };

  myLib.body.addEventListener('click', function (e) {
    var target = e.target;
    var popupClass = myLib.closestAttr(target, 'data-popup');

    if (popupClass === null) {
      return;
    }

    e.preventDefault();
    var popup = document.querySelector('.' + popupClass);

    if (popup) {
      showPopup(popup);
      myLib.toggleScroll();
    }
  });

  myLib.body.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('popup-close') ||
      target.classList.contains('popup__inner')) {
      var popup = myLib.closestItemByClass(target, 'popup');

      closePopup(popup);
      myLib.toggleScroll();
    }
  });

  myLib.body.addEventListener('keydown', function (e) {
    if (e.keyCode !== 27) {
      return;
    }

    var popup = document.querySelector('.popup.is-active');

    if (popup) {
      closePopup(popup);
      myLib.toggleScroll();
    }
  });
})();

/* popup end */



/* catalog start */
; (function () {
  var catalogSection = document.querySelector('.section-catalog');

  if (catalogSection === null) {
    return;
  }

  var removeChildren = function (item) {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }
  };

  var updateChildren = function (item, children) {
    removeChildren(item);
    for (var i = 0; i < children.length; i += 1) {
      item.appendChild(children[i]);
    }
  };

  var catalog = catalogSection.querySelector('.catalog');
  var catalogNav = catalogSection.querySelector('.catalog-nav');
  var catalogItems = catalogSection.querySelectorAll('.catalog__item');

  catalogNav.addEventListener('click', function (e) {
    var target = e.target;
    var item = myLib.closestItemByClass(target, 'catalog-nav__btn');

    if (item === null || item.classList.contains('is-active')) {
      return;
    }

    e.preventDefault();
    var filterValue = item.getAttribute('data-filter');
    var previousBtnActive = catalogNav.querySelector('.catalog-nav__btn.is-active');

    previousBtnActive.classList.remove('is-active');
    item.classList.add('is-active');

    if (filterValue === 'all') {
      updateChildren(catalog, catalogItems);
      return;
    }

    var filteredItems = [];
    for (var i = 0; i < catalogItems.length; i += 1) {
      var current = catalogItems[i];
      if (current.getAttribute('data-category') === filterValue) {
        filteredItems.push(current);
      }
    }

    updateChildren(catalog, filteredItems);
  });
})();

/* catalog end */

/* product start */
; (function () {
  var catalog = document.querySelector('.catalog');

  if (catalog === null) {
    return;
  }

  var updateProductPrice = function (product, price) {
    var productPrice = product.querySelector('.product__price-value');
    productPrice.textContent = price;
  };


  var changeProductOrderInfo = function (target) {
    var product = myLib.closestItemByClass(target, 'product');
    var order = document.querySelector('.popup-order');

    var productTitle = product.querySelector('.product__title').textContent;
    var productPrice = product.querySelector('.product__price-value').textContent;
    var productImgSrc = product.querySelector('.product__img').getAttribute('src');

    order.querySelector('.order-info-title').setAttribute('value', productTitle);

    order.querySelector('.order-info-price').setAttribute('value', productPrice);

    order.querySelector('.order-product-title').textContent = productTitle;
    order.querySelector('.order-product-price').textContent = productPrice;

    order.querySelector('.order__img').setAttribute('src', productImgSrc);
  };

  catalog.addEventListener('click', function (e) {
    var target = e.target;


    if (target.classList.contains('product__btn')) {
      e.preventDefault();
      changeProductOrderInfo(target);
    }
  });
})();
/* product end */



/* form start */
; (function () {
  var forms = document.querySelectorAll('.form-send');

  if (forms.length === 0) {
    return;
  }

  var serialize = function (form) {
    var items = form.querySelectorAll('input, select, textarea');
    var str = '';
    for (var i = 0; i < items.length; i += 1) {
      var item = items[i];
      var name = item.name;
      var value = item.value;
      var separator = i === 0 ? '' : '&';

      if (value) {
        str += separator + name + '=' + value;
      }
    }
    return str;
  };

  var formSend = function (form) {
    var data = serialize(form);
    var xhr = new XMLHttpRequest();
    var url = 'mail/mail.php';

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
      var activePopup = document.querySelector('.popup.is-active');

      if (activePopup) {
        activePopup.classList.remove('is-active');
      } else {
        myLib.toggleScroll();
      }

      if (xhr.response === 'success') {
        document.querySelector('.popup-thanks').classList.add('is-active');
      } else {
        document.querySelector('.popup-error').classList.add('is-active');
      }

      form.reset();
    };

    xhr.send(data);
  };

  for (var i = 0; i < forms.length; i += 1) {
    forms[i].addEventListener('submit', function (e) {
      e.preventDefault();
      var form = e.currentTarget;
      formSend(form);
    });
  }
})();
/* form end */


/* scrollTo start */
; (function () {


  var scroll = function (target) {
    var targetTop = target.getBoundingClientRect().top;
    var scrollTop = window.pageYOffset;
    var targetOffsetTop = targetTop + scrollTop;
    var headerOffset = document.querySelector('.header-page').clientHeight;

    window.scrollTo(0, targetOffsetTop - headerOffset);
  }

  myLib.body.addEventListener('click', function (e) {
    var target = e.target;
    var scrollToItemClass = myLib.closestAttr(target, 'data-scroll-to');

    if (scrollToItemClass === null) {
      return;
    }

    e.preventDefault();
    var scrollToItem = document.querySelector('.' + scrollToItemClass);

    if (scrollToItem) {
      scroll(scrollToItem);
    }
  });
})();
/* scrollTo end */

window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+38 (___) ___ __ __",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});