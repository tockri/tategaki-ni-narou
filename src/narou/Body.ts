import $ from "jquery"
import { Config } from "../Config"

const setBodyClass = (config: Config) => {
  if ($("body").length > 0) {
    if (config.useSerifOnNarou) {
      $("body").addClass("tategaki-ni-narou-serif").removeClass("tategaki-ni-narou-sanserif")
    } else {
      $("body").addClass("tategaki-ni-narou-sanserif").removeClass("tategaki-ni-narou-serif")
    }
  } else {
    setTimeout(() => setBodyClass(config), 50)
  }
}

export const Body = {
  setBodyClass
}
