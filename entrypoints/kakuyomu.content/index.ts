import $ from "jquery"
import { jump, setupNovelReader } from "@/components/NovelReader"
import "./kakuyomuu.scss"

export default defineContentScript({
  matches: ["https://kakuyomu.jp/works/*/episodes/*"],
  runAt: "document_start",
  main() {
    const init = (counter: number) => {
      const reader = $(".js-episode-body")
      if (reader.length) {
        console.log("reader found!")
        $(document).scrollTop(0)

        reader.prepend($("#contentMain-header"))
        setupNovelReader(reader, {
          articleSelector: ".widget-episodeBody",
          index: () => {
            jump($("#worksEpisodesEpisodeHeader-breadcrumbs a:first-child"))
          },
          myPage: () => {
            window.location.href = "https://kakuyomu.jp/my/antenna/works"
          },
          next: () => {
            jump($("#contentMain-nextEpisode>a"))
          },
          prev: () => {
            jump($("#contentMain-previousEpisode>a"))
          },
          help: () => {}
        })
      } else {
        if (counter < 3) {
          window.setTimeout(() => init(counter + 1), 300)
        }
      }
    }
    console.log("hello, kakuyomu content.")
    init(0)
  }
})
