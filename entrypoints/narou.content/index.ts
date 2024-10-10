import "./narou.scss"
import $ from "jquery"
import { jump, setupNovelReader } from "@/components/NovelReader"
import { Config } from "@/components/Config"
import { Pager } from "./Pager"
import { Body } from "./Body"
import { Head } from "./Head"
import { HelpButton } from "./HelpButton"

export default defineContentScript({
  matches: [
    "https://ncode.syosetu.com/*",
    "https://novel18.syosetu.com/*",
    "http://ncode.syosetu.com/*",
    "http://novel18.syosetu.com/*"
  ],
  runAt: "document_start",
  main() {
    const isMobile = () => $(".c-menu__body>.c-menu__first").length > 0

    const config = new Config()

    const setScrollbarWidth = () => {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      // カスタムプロパティの値を更新する
      document.documentElement.style.setProperty("--scrollBarWidth", `${scrollbarWidth}px`)
    }

    // リサイズしたとき
    window.addEventListener("resize", setScrollbarWidth)

    $(() => {
      setScrollbarWidth()
      const reader = $(".l-container:has(.p-novelgood-form) article.p-novel")
      if (reader.length) {
        Body.setBodyClass(config)
        Head.prepare()
        if (isMobile()) {
          Pager.prepareForMobile(reader)
        } else {
          HelpButton.prepareHelpButtonForPc({
            showHelpLabel: config.isHelpLabelVisible,
            useSerifFont: config.useSerifOnNarou,
            onFontChanged: (font) => {
              config.setSerifOnNarou(font === "serif")
              Body.setBodyClass(config)
            },
            onHelpClosed: () => {
              config.hideHelpLabel()
            }
          })
          Pager.prepareForPc(reader)
        }
        setupNovelReader(reader, {
          articleSelector: "article.p-novel",
          index(): void {
            jump($(".tnn_index-link"))
          },
          myPage(): void {
            jump($("a.c-menu__item:contains(ブックマーク)"))
          },
          next(): void {
            jump($(".tnn_next-link"))
          },
          prev(): void {
            jump($(".tnn_prev-link"))
          },
          help: HelpButton.show
        })
      }
    })
  }
})
