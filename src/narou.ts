import $ from "jquery"
import { jump, setupNovelReader } from "./NovelReader"
import { Config } from "./Config"
import { Pager } from "./narou/Pager"
import { Body } from "./narou/Body"
import { Head } from "./narou/Head"
import { HelpButton } from "./narou/HelpButton"

const isMobile = () => $(".c-menu__body>.c-menu__first").length > 0

const config = new Config()

$(() => {
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
