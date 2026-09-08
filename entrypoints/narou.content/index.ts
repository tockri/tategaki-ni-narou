import { Config } from "@/components/Config"
import { jump, setupNovelReader } from "@/components/NovelReader"
import $ from "jquery"
import { Ad } from "./Ad"
import { Body } from "./Body"
import { Head } from "./Head"
import { HelpButton } from "./HelpButton"
import { Pager } from "./Pager"
import { ToPageTopButton } from "./ToPageTopButton"
import "./narou.scss"

export default defineContentScript({
  matches: ["https://ncode.syosetu.com/*", "https://novel18.syosetu.com/*"],
  runAt: "document_start",
  main() {
    $(() => {
      const reader = $(".l-container:has(#novel_hyouka) article.p-novel")
      if (reader.length) {
        const isMobile = $(".c-menu__body>.c-menu__first").length > 0

        Ad.replace(reader)
        Body.setBodyClass(Config.useSerifOnNarou)
        Head.prepareWebFont()
        Head.startScrollbarWidth()
        ToPageTopButton.remove()

        if (isMobile) {
          Pager.prepareForMobile(reader)
        } else {
          HelpButton.prepareHelpButtonForPc({
            showHelpLabel: Config.isHelpLabelVisible,
            useSerifFont: Config.useSerifOnNarou,
            onFontChanged: (font) => {
              Config.setSerifOnNarou(font === "serif")
              Body.setBodyClass(Config.useSerifOnNarou)
            },
            onHelpClosed: () => {
              Config.hideHelpLabel()
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
            jump($("a.p-bookmark-bar__bkm-link:contains(ブックマーク)"))
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
