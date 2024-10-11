import { Config } from "@/components/Config"
import { jump, setupNovelReader } from "@/components/NovelReader"
import $ from "jquery"
import { Ad } from "./Ad"
import { Body } from "./Body"
import { Head } from "./Head"
import { HelpButton } from "./HelpButton"
import "./narou.scss"
import { Pager } from "./Pager"

export default defineContentScript({
  matches: [
    "https://ncode.syosetu.com/*",
    "https://novel18.syosetu.com/*",
    "http://ncode.syosetu.com/*",
    "http://novel18.syosetu.com/*"
  ],
  runAt: "document_start",
  main() {
    $(() => {
      const reader = $(".l-container:has(.p-novelgood-form) article.p-novel")
      if (reader.length) {
        const isMobile = () => $(".c-menu__body>.c-menu__first").length > 0

        const config = new Config()

        Ad.replace(reader)
        Body.setBodyClass(config.useSerifOnNarou)
        Head.prepare()
        if (isMobile()) {
          Pager.prepareForMobile(reader)
        } else {
          HelpButton.prepareHelpButtonForPc({
            showHelpLabel: config.isHelpLabelVisible,
            useSerifFont: config.useSerifOnNarou,
            onFontChanged: (font) => {
              config.setSerifOnNarou(font === "serif")
              Body.setBodyClass(config.useSerifOnNarou)
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
