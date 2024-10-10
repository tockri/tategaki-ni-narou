import $ from "jquery"

const modifyPagerForPc = (pager: JQuery): JQuery => {
  pager.find("a").each((_, a) => {
    const text = a.innerHTML
    if (text.includes("目次")) {
      a.className = "tnn_index-link"
    } else if (text.includes("前へ")) {
      a.innerHTML = "前へ&nbsp;&gt;&gt;"
      a.className = "tnn_prev-link"
    } else if (text.includes("次へ")) {
      a.innerHTML = "&lt;&lt;&nbsp;次へ"
      a.className = "tnn_next-link"
    }
  })
  return pager
}

const prepareForPc = (reader: JQuery) => {
  const topPager = reader.find(".c-pager:eq(0)")
  const novelNumber = reader.find(".p-novel__number:eq(0)")
  const bottomPager = reader.find(".c-pager:eq(1)")
  reader.before(modifyPagerForPc(topPager.append(novelNumber)))
  reader.after(modifyPagerForPc(bottomPager))
}

const modifyPagerForMobile = (pager: JQuery, removeIndex: boolean): JQuery => {
  pager.find("div.c-pager__block").each((_, div) => {
    const $div = $(div)
    const $a = $div.find("a")
    const text = $a.text()
    if (text.includes("目次")) {
      if (removeIndex) {
        $div.remove()
      } else {
        $div.addClass("tnn_index-link-box")
      }
    } else if (text.includes("前へ")) {
      $a.html("前へ&nbsp;&gt;&gt;")
      $a[0].className = "tnn_prev-link"
      $div.addClass("tnn_prev-link-box")
    } else if (text.includes("次へ")) {
      $a.html("&lt;&lt;&nbsp;次へ")
      $a[0].className = "tnn_next-link"
      $div.addClass("tnn_next-link-box")
    } else if ($a.length === 0) {
      $div.remove()
    }
  })
  return pager.append("<div></div>")
}

const prepareForMobile = (reader: JQuery) => {
  const topPager = reader.find(".c-pager:eq(0)")
  const novelNumber = reader.find(".p-novel__number:eq(0)")
  const bottomPager = reader.find(".c-pager:eq(1)")
  reader.before(modifyPagerForMobile(topPager, true).prepend(novelNumber.addClass("c-pager__block")))
  reader.after(modifyPagerForMobile(bottomPager, false))
}

export const Pager = {
  prepareForMobile,
  prepareForPc
}
