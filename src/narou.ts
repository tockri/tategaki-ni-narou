import $ from "jquery"
import { jump, setupNovelReader } from "./NovelReader"
import { Config } from "./Config"
import { Pager } from "./narou/Pager"
import { Body } from "./narou/Body"
import { Head } from "./narou/Head"
import { HelpButton } from "./narou/HelpButton"

const isMobile = () => $(".c-menu__body>.c-menu__first").length > 0

const config = new Config()

Body.setBodyClass(config)

Head.prepare()

$(() => {
  const reader = $(".l-container:has(.p-novelgood-form) article.p-novel")
  if (reader.length) {
    if (isMobile()) {
      Pager.prepareForMobile(reader)
    } else {
      HelpButton.prepareHelpButtonForPc(config)
      Pager.prepareForPc(reader)
    }
    setupNovelReader(reader, {
      articleSelector: "article.p-novel",
      index(): void {
        jump($(".tnn_index-link"))
      },
      myPage(): void {
        jump($(".list_menu_novelview_after:eq(0)>a"))
      },
      next(): void {
        jump($(".tnn_next-link"))
      },
      prev(): void {
        jump($(".tnn_prev-link"))
      },
      help: () => HelpButton.toggleHelpOpen(config)
    })
  } else {
    console.warn("Element article.p-novel not found")
  }
})
