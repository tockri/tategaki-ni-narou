import $ from "jquery"

const prepareWebFont = () => {
  if ($("head").length === 0) {
    setTimeout(prepareWebFont, 50)
  } else {
    $("head")
      .append('<link rel="preconnect" href="https://fonts.googleapis.com">')
      .append('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>')
      .append(
        '<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300&display=swap" rel="stylesheet">'
      )
  }
}

const setScrollbarWidth = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.documentElement.style.setProperty("--scrollBarWidth", `${scrollbarWidth + 1}px`)
}

const startScrollbarWidth = () => {
  setScrollbarWidth()
  window.removeEventListener("resize", startScrollbarWidth)
}

export const Head = {
  prepareWebFont,
  startScrollbarWidth
} as const
