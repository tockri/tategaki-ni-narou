import $ from "jquery"

const remove = (): void => {
  if ($("body").length === 0) {
    setTimeout(remove, 100)
  } else {
    $("#pageTop").remove()
  }
}

export const ToPageTopButton = { remove }
