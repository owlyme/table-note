// js 部分
/**
 * ModalHelper helpers resolve the modal scrolling issue on mobile devices
 * https://github.com/twbs/bootstrap/issues/15852
 */
var ModalHelper = (function (bodyClass) {
  var scrollTop;
  return {
    afterOpen: function () {
      scrollTop =
        document.scrollingElement.scrollTop ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      document.body.classList.add(bodyClass);
      document.body.style.top = -scrollTop + "px";
    },
    beforeClose: function () {
      document.body.classList.remove(bodyClass);
      document.scrollingElement.scrollTop = document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
    },
  };
})("modal_open");
