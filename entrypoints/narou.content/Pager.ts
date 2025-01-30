import $ from "jquery"

const modifyPagerForPc = (pager: JQuery, removeIndex: boolean): JQuery => {
  pager.find("a").each((_, a) => {
    const $a = $(a)
    const text = $a.text()
    if (text.includes("目次")) {
      if (removeIndex) {
        $a.remove()
      } else {
        $a.addClass("tnn_index-link")
      }
    } else if (text.includes("前へ")) {
      $a.html("前へ&nbsp;&gt;&gt;")
      $a.addClass("tnn_prev-link")
    } else if (text.includes("次へ")) {
      $a.html("&lt;&lt;&nbsp;次へ")
      $a.addClass("tnn_next-link")
    }
  })
  return pager
}

const prepareForPc = (reader: JQuery) => {
  const topPager = reader.find(".c-pager:eq(0)")
  const novelNumber = reader.find(".p-novel__number:eq(0)")
  topPager.append(novelNumber).addClass("tnn_top-pager")
  modifyPagerForPc(topPager, true)

  const bottomPager = reader.nextAll(".c-pager:eq(0)")
  bottomPager.addClass("tnn_bottom-pager")
  modifyPagerForPc(bottomPager, false)

  reader.before(topPager)
  reader.after(bottomPager)
}

const modifyPagerForMobile = (pager: JQuery, removeIndex: boolean): JQuery => {
  console.debug("modifyPagerForMobile")
  pager.find("div.c-pager__block").each((_, div) => {
    const $div = $(div)
    const $a = $div.find("a")
    const text = $a.text()
    console.debug(text)
    if (text.includes("目次")) {
      if (removeIndex) {
        $div.remove()
      } else {
        $div.addClass("tnn_index-link-box")
      }
    } else if (text.includes("前へ")) {
      $a.html("前へ&nbsp;&gt;&gt;")
      $a.addClass("tnn_prev-link")
      $div.addClass("tnn_prev-link-box")
    } else if (text.includes("次へ")) {
      $a.html("&lt;&lt;&nbsp;次へ")
      $a.addClass("tnn_next-link")
      $div.addClass("tnn_next-link-box")
    } else if ($a.length === 0) {
      $div.remove()
    }
  })
  return pager.append("<div></div>")
}

const prepareForMobile = (reader: JQuery) => {
  const topPager = reader.prevAll(".c-pager:eq(0)")
  const novelNumber = reader.find(".p-novel__number:eq(0)")
  const bottomPager = reader.nextAll(".c-pager:eq(0)")
  const bookmarkBar = reader.nextAll(".p-bookmark-bar:eq(0)")
  reader.before(modifyPagerForMobile(topPager, true).prepend(novelNumber.addClass("c-pager__block")))
  reader.after(bookmarkBar).after(modifyPagerForMobile(bottomPager, false))
}

export const Pager = {
  prepareForMobile,
  prepareForPc
}
