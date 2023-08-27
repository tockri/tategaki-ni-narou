import $ from "jquery"

export const jump = (elem: JQuery) => {
  if (elem.length > 0) {
    const a = elem[0].tagName === "A" && (elem[0] as HTMLAnchorElement)
    if (a) {
      location.href = a.href
    }
  }
}

export type NovelReaderConf = {
  prev: () => void
  next: () => void
  bookmark: () => void
  myPage: () => void
  index: () => void
  articleSelector: string
}

class Scroller {
  private locked = false
  private readonly reader: JQuery
  constructor(reader: JQuery) {
    this.reader = reader
  }

  scrollLeftBy(h: number) {
    if (!this.locked) {
      this.locked = true
      const sl = (this.reader.scrollLeft() || 0) - h
      this.reader.animate({ scrollLeft: sl }, () => {
        this.locked = false
      })
    }
  }

  pageUp(rate: number = 1.0) {
    const rw = this.reader.width()
    if (rw) {
      const pw = rw * (rw >= 360 ? 0.96 : 3.5)
      this.scrollLeftBy(-pw * rate)
    }
  }

  pageDown(rate: number = 1.0) {
    const rw = this.reader.width()
    if (rw) {
      const pw = rw * (rw >= 360 ? 0.96 : 3.5)
      this.scrollLeftBy(pw * rate)
    }
  }
}

const mapKeyEvents = (scroller: Scroller, conf: NovelReaderConf) => {
  const keyMap: Record<string, (e: JQuery.KeyDownEvent) => void> = {
    " ": (e) => (e.shiftKey ? scroller.pageUp() : scroller.pageDown()),
    PageUp: () => scroller.pageUp(),
    PageDown: () => scroller.pageDown(),
    End: () => scroller.scrollLeftBy(-99999),
    Home: () => scroller.scrollLeftBy(99999),
    AllowLeft: (e) => (e.shiftKey ? scroller.pageDown(0.5) : scroller.scrollLeftBy(200)),
    AllowRight: (e) => (e.shiftKey ? scroller.pageUp(0.5) : scroller.scrollLeftBy(-200)),
    b: conf.bookmark,
    n: conf.next,
    m: conf.myPage,
    p: conf.prev,
    l: conf.index,
    z: () => scroller.pageDown(0.5),
    x: () => scroller.pageUp(0.5)
  }
  $(document).on("keydown", (e) => {
    const func = keyMap[e.key]
    if (func) {
      e.preventDefault()
      e.stopPropagation()
      func(e)
    }
  })
}

const makeScrollButtons = (reader: JQuery, scroller: Scroller) => {
  reader.before('<div class="tategaki-left"></div><div class="tategaki-right"></div>')
  $(document).on("click", (e) => {
    const cls = (e.target as unknown as HTMLElement).className
    if (cls === "tategaki-left") {
      scroller.pageDown(0.5)
    } else if (cls === "tategaki-right") {
      scroller.pageUp(0.5)
    }
  })
}

const rotateParentheses = ($elem: JQuery) => {
  const html = $elem.html()
  $elem.html(
    html.replace(/[（）｛｝〔〕【】《》〈〉「」『』［］]/g, (m) => {
      switch (m) {
        case "（":
          return "︵"
        case "）":
          return "︶"
        case "｛":
          return "︷"
        case "｝":
          return "︸"
        case "〔":
          return "︹"
        case "〕":
          return "︺"
        case "【":
          return "︻"
        case "】":
          return "︼"
        case "《":
          return "︽"
        case "》":
          return "︾"
        case "〈":
          return "︿"
        case "〉":
          return "﹀"
        case "「":
          return "﹁"
        case "」":
          return "﹂"
        case "『":
          return "﹃"
        case "』":
          return "﹄"
        case "［":
          return "﹇"
        case "］":
          return "﹈"
        default:
          return m
      }
    })
  )
}

export const setupNovelReader = (reader: JQuery, conf: NovelReaderConf) => {
  const scroller = new Scroller(reader)
  mapKeyEvents(scroller, conf)
  makeScrollButtons(reader, scroller)
  rotateParentheses(reader)
}
