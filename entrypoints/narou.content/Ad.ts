const replace = (reader: JQuery): void => {
  const ad = reader.find(".c-ad")
  reader.after(ad)
}

export const Ad = {
  replace
}
