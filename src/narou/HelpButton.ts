import $ from "jquery"
import { Config } from "../Config"
import { Body } from "./Body"

const toggleHelpOpen = (config: Config) => {
  $("body").toggleClass("tategaki-ni-narou-help-open")
  $(".tategaki-ni-narou-icon .icon-label").remove()
  config.hideHelpLabel()
}

const prepareHelpButtonForPc = (config: Config) => {
  const toggleHelp = () => toggleHelpOpen(config)

  const base = $(".c-menu__body")
  const label = config.isHelpLabelVisible ? `<span class="icon-label">縦書きになろうヘルプ・設定</span>` : ""

  const button = $(
    `<button class="tategaki-ni-narou-icon" title="縦書きになろうヘルプ・設定">${label}<img src="${chrome.runtime.getURL("icons/icon-48.png")}"></button>`
  )
  button.on("click", toggleHelp)
  base.append(button)
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
    Body.setBodyClass(config)
  })
  serif.on("change", () => {
    config.setSerifOnNarou(true)
    Body.setBodyClass(config)
  })
  help.on("click", toggleHelp)
  $("body").append(help)
}

export const HelpButton = {
  prepareHelpButtonForPc,
  toggleHelpOpen
}
