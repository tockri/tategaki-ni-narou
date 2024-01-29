import $ from "jquery"
import { jump, setupNovelReader } from "./NovelReader"
import { Config } from "./Config"

const isMobile = () => $(".novel_bn>div").length > 0

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

const preparePagerForPc = () => {
  $(".novel_bn").each((i, bn) => {
    $("a", bn).each((_, a) => {
      const text = a.innerHTML
      if (text === "目次") {
        if (i === 0) {
          a.remove()
        } else {
          const ln = $('<div class="link-to-index"></div>')
          ln.append(a)
          a.className = "js_index-link"
          $(bn).after(ln)
        }
      } else if (text.includes("前へ")) {
        a.innerHTML = "前へ&nbsp;&gt;&gt;"
        a.className = "ready js_prev-link"
      } else if (text.includes("次へ")) {
        a.innerHTML = "&lt;&lt;&nbsp;次へ"
        a.className = "ready js_next-link"
      }
    })
  })
  $("#novel_no").addClass("ready")
}

const preparePagerForMobile = () => {
  $(".novel_bn").each((i, bn) => {
    $("div", bn).each((_, div) => {
      const $a = $("a", div)
      if ($a.length === 1) {
        const text = $a.html()
        console.log({ text }, $a[0])
        if (text === "目次") {
          if (i === 0) {
            const no = $("#novel_no")
            no.removeAttr("id")
            $a.after(no)
            $a.remove()
          } else {
            $a.addClass("js_index-link")
          }
        } else if (text.includes("前へ")) {
          $a.html("前へ&nbsp;&gt;&gt;")
          $a[0].className = "js_prev-link"
        } else if (text.includes("次へ")) {
          $a.html("&lt;&lt;&nbsp;次へ")
          $a[0].className = "js_next-link"
        }
        $(div).addClass("ready")
      }
    })
  })
}

const config = new Config()

const toggleHelpOpen = async () => {
  $("body").toggleClass("tategaki-ni-narou-help-open")
  $(".tategaki-ni-narou-icon .icon-label").remove()
  config.hideHelpLabel()
}

const setBodyClass = () => {
  if ($("body").length > 0) {
    if (config.useSerifOnNarou) {
      $("body").addClass("tategaki-ni-narou-serif").removeClass("tategaki-ni-narou-sanserif")
    } else {
      $("body").addClass("tategaki-ni-narou-sanserif").removeClass("tategaki-ni-narou-serif")
    }
  } else {
    setTimeout(setBodyClass, 50)
  }
}
setBodyClass()

const prepareHelpButtonForPc = () => {
  const base = $("#novelnavi_right")
  const label = config.isHelpLabelVisible ? `<span class="icon-label">縦書きになろうヘルプ・設定</span>` : ""

  const button = $(
    `<button class="tategaki-ni-narou-icon" title="縦書きになろうヘルプ・設定">${label}<img src="${chrome.runtime.getURL("icons/icon-48.png")}"></button>`
  )
  button.on("click", toggleHelpOpen)
  base.prepend(button)
  const help = $(`<div class="tategaki-ni-narou-help">
  <div class="content">
    <h1>縦書きになろう</h1>
    <h2>設定</h2>
    <table>
      <tbody>
        <tr>
          <th>フォント</th>
          <td>
            <label class="tategaki-ni-narou-form-radio">
              <input class="tategaki-ni-narou-serif" type="radio" name="font" value="serif">
              明朝体
            </label>
            <label class="tategaki-ni-narou-form-radio">
              <input class="tategaki-ni-narou-sanserif" type="radio" name="font" value="sanserif">
              ゴシック体
            </label>
          </td>
        </tr>
      </tbody>
    </table>
    <h2>キーボード操作</h2>
    <table>
      <tbody>
        <tr>
          <th>N</th>
          <td>次の話</th>
          <th>Space</th>
          <td>1ページ分左にスクロール</th>
        </tr>
        <tr>
          <th>P</th>
          <td>前の話</th>
          <th>Shift+Space</th>
          <td>1ページ分右にスクロール</th>
        </tr>
        <tr>
          <th>L</th>
          <td>作品目次に移動</th>
          <th>Z , Shift+←</th>
          <td>ページ半分左にスクロール</th>
        </tr>
        <tr>
          <th>M</th>
          <td>マイページに移動</th>
          <th>X , Shift+→</th>
          <td>ページ半分右にスクロール</th>
        </tr>
        <tr>
          <th>B</th>
          <td>しおりをつける</th>
          <th>Home</th>
          <td>一番左までスクロール</td>
        </tr>
        <tr>
          <th>←</th>
          <td>左にスクロール</td>
          <th>End</th>
          <td>一番右までスクロール</td>
        </tr>
        <tr>
          <th>→</th>
          <td>右にスクロール</td>
          <th>H</th>
          <td>このヘルプを表示/非表示する</th>
        </tr>
      </tbody>
    </table>
  </div>
</div>`)
  const sanserif = $(".tategaki-ni-narou-sanserif", help)
  const serif = $(".tategaki-ni-narou-serif", help)
  if (config.useSerifOnNarou) {
    serif.prop("checked", true)
    sanserif.prop("checked", false)
  } else {
    serif.prop("checked", false)
    sanserif.prop("checked", true)
  }
  sanserif.on("change", () => {
    config.setSerifOnNarou(false)
    setBodyClass()
  })
  serif.on("change", () => {
    config.setSerifOnNarou(true)
    setBodyClass()
  })
  help.on("click", toggleHelpOpen)
  $("body").append(help)
}

prepareHead()

$(() => {
  const reader = $("#novel_honbun")
  if (reader.length) {
    prepareMain(reader)
    if (isMobile()) {
      preparePagerForMobile()
    } else {
      prepareHelpButtonForPc()
      preparePagerForPc()
    }
    setupNovelReader(reader, {
      articleSelector: "#novel_honbun",
      bookmark(): void {
        $(".set_siori:eq(0)").trigger("click")
      },
      index(): void {
        jump($(".js_index-link"))
      },
      myPage(): void {
        jump($(".list_menu_novelview_after:eq(0)>a"))
      },
      next(): void {
        jump($(".js_next-link"))
      },
      prev(): void {
        jump($(".js_prev-link"))
      },
      help: toggleHelpOpen
    })
  }
})
