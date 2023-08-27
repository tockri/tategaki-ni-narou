import $ from "jquery"

const isMobile = () => $(".novel_bn>.link_prev").length > 0

const prepareHead = () => {
  $("head")
    .append('<link rel="preconnect" href="https://fonts.googleapis.com">')
    .append('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>')
    .append(
      '<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300&display=swap" rel="stylesheet">'
    )
}

const prepareMain = (reader: JQuery) => {
  reader.prepend($("#novel_p")) // 前文
  reader.prepend($(".novel_subtitle")) // 章タイトル
  reader.append($("#novel_a")) // あとがき
}

const preparePager = () => {
  if (isMobile()) {
    console.log("mobile")
  } else {
    console.log("pc")
  }
}

prepareHead()

$(() => {
  console.log("start initialize")
  const reader = $("#novel_honbun")
  if (reader.length) {
    prepareMain(reader)
    preparePager()
  }
})

console.log("hello, narou.")
