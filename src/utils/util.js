export function sleep(data, time = 500) {
  return new Promise((resolve) => {
    let timer = setTimeout(() => {
      resolve(data);
      clearTimeout(timer);
    }, time);
  });
}

export function modalHelper(bodyClass) {
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
}
