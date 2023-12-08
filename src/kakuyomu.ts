import $ from "jquery"
import { jump, setupNovelReader } from "./NovelReader"

$(() => {
  const reader = $(".js-episode-body")
  if (reader.length) {
    $(document).scrollTop(0)

    reader.prepend($("#contentMain-header"))
    setupNovelReader(reader, {
      articleSelector: ".widget-episodeBody",
      bookmark: () => {
        return
      },
      index: () => {
        jump($("#worksEpisodesEpisodeHeader-breadcrumbs a:first-child"))
      },
      myPage: () => {
        location.href = "https://kakuyomu.jp/my/antenna/works"
      },
      next: () => {
        jump($("#contentMain-nextEpisode>a"))
      },
      prev: () => {
        jump($("#contentMain-previousEpisode>a"))
      }
    })
  }
})
