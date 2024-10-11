import $ from "jquery"
const prepare = () => {
  $("head")
    .append('<link rel="preconnect" href="https://fonts.googleapis.com">')
    .append('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>')
    .append(
      '<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300&display=swap" rel="stylesheet">'
    )

  window.addEventListener("resize", setScrollbarWidth)
  setScrollbarWidth()
}

const setScrollbarWidth = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.documentElement.style.setProperty("--scrollBarWidth", `${scrollbarWidth}px`)
}

export const Head = {
  prepare
}
