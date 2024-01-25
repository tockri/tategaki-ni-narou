import $ from "jquery"
import { jump, setupNovelReader } from "./NovelReader"

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

const STORAGE_KEY_HIDE_ICON_LABEL = "tategaki-ni-narou-hide-icon-label"

const markHideIconInStorage = async () => {
  await chrome.storage.sync.set({ [STORAGE_KEY_HIDE_ICON_LABEL]: 1 })
}

const isMarkedHideIconInStorage = async () => {
  return (await chrome.storage.sync.get(STORAGE_KEY_HIDE_ICON_LABEL))[STORAGE_KEY_HIDE_ICON_LABEL]
}

const toggleHelpOpen = async () => {
  $("body").toggleClass("tategaki-ni-narou-help-open")
  $(".tategaki-ni-narou-icon .icon-label").remove()
  await markHideIconInStorage()
}

const cleanupLocalStorage = async () => {
  if (localStorage.getItem(STORAGE_KEY_HIDE_ICON_LABEL)) {
    localStorage.removeItem(STORAGE_KEY_HIDE_ICON_LABEL)
    await markHideIconInStorage()
  }
}
cleanupLocalStorage().then()

const prepareHelpButtonForPc = async () => {
  const base = $("#novelnavi_right")
  const label = (await isMarkedHideIconInStorage()) ? "" : `<span class="icon-label">縦書きになろうヘルプ</span>`
  console.log({ label: await chrome.storage.sync.get("tategaki-ni-narou-hide-icon-label") })
  const button = $(
    `<button class="tategaki-ni-narou-icon">${label}<img src="${chrome.runtime.getURL("icons/icon-48.png")}"></button>`
  )
  button.on("click", toggleHelpOpen)
  base.prepend(button)
  const help = $(`<div class="tategaki-ni-narou-help">
  <div class="content">
    <h1>縦書きになろう キーボード操作</h1>
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
      prepareHelpButtonForPc().then()
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
