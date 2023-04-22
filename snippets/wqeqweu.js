(function () {
  const EXCLUDE_URL_LIST = [
    "css",
    "js",
    "html",
    "json",
    "png",
    "jpeg",
    "txt",
    "php",
  ];
  const checker = (arr) => {
    return !EXCLUDE_URL_LIST.some((e) => arr.includes(e));
  };

  console.log(["ok.js", "this.not", "is.html", "ok.com"].filter(checker));
})();
