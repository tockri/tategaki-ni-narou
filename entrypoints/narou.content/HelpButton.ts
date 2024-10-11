import $ from "jquery"

const show = () => {
  $("body").addClass("tategaki-ni-narou-help-open")
}

const hide = () => {
  $("body").removeClass("tategaki-ni-narou-help-open")
  $(".tategaki-ni-narou-icon .icon-label").remove()
}

interface HelpButtonOption {
  showHelpLabel: boolean
  useSerifFont: boolean
  onHelpClosed(): void
  onFontChanged(font: "serif" | "sanserif"): void
}

const prepareHelpButtonForPc = (option: HelpButtonOption) => {
  const base = $(".c-menu__body")
  const label = option.showHelpLabel ? `<span class="icon-label">縦書きになろうヘルプ・設定</span>` : ""

  const button = $(
    `<button class="tategaki-ni-narou-icon" title="縦書きになろうヘルプ・設定">${label}<img src="${chrome.runtime.getURL("icon/48.png")}"></button>`
  )
  button.on("click", show)
  base.append(button)
  const helpPane = $(`<div class="tategaki-ni-narou-help">
    <div class="content">
      <h1>縦書きになろう</h1>
      <h2>設定</h2>
      <table class="tategaki-ni-narou-form">
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
  const sanserif = $(".tategaki-ni-narou-sanserif", helpPane)
  const serif = $(".tategaki-ni-narou-serif", helpPane)
  if (option.useSerifFont) {
    serif.prop("checked", true)
    sanserif.prop("checked", false)
  } else {
    serif.prop("checked", false)
    sanserif.prop("checked", true)
  }
  sanserif.on("change", () => {
    option.onFontChanged("sanserif")
  })
  serif.on("change", () => {
    option.onFontChanged("serif")
  })
  const form = $(".tategaki-ni-narou-form", helpPane)
  form.on("click", (e) => {
    e.stopPropagation()
  })
  helpPane.on("click", hide)
  $("body").append(helpPane)
}

export const HelpButton = {
  prepareHelpButtonForPc,
  show
}
