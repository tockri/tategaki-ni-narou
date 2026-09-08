const prefix = "tategaki-ni-narou-"

const getValue = (key: string): string | null => localStorage.getItem(`${prefix}${key}`)

const setValue = (key: string, value: string): void => {
  localStorage.setItem(`${prefix}${key}`, value)
}

export const Config = {
  get useSerifOnNarou(): boolean {
    return getValue("serif-font-in-narou") !== "0"
  },

  setSerifOnNarou(value: boolean): void {
    setValue("serif-font-in-narou", value ? "1" : "0")
  },

  get isHelpLabelVisible(): boolean {
    return getValue("show-help-label") !== "0"
  },

  hideHelpLabel(): void {
    setValue("show-help-label", "0")
  }
}
