import $ from "jquery"

const setBodyClass = (useSerifOnNarou: boolean) => {
  if ($("body").length > 0) {
    if (useSerifOnNarou) {
      $("body").addClass("tategaki-ni-narou-serif").removeClass("tategaki-ni-narou-sanserif")
    } else {
      $("body").addClass("tategaki-ni-narou-sanserif").removeClass("tategaki-ni-narou-serif")
    }
  } else {
    setTimeout(() => setBodyClass(useSerifOnNarou), 50)
  }
}

export const Body = {
  setBodyClass
}
