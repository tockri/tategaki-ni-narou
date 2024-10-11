const replace = (reader: JQuery) => {
  const ad = reader.find(".c-ad")
  reader.after(ad)
}

export const Ad = {
  replace
}
