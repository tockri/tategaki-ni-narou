export class Config {
  private getValue(key: string): string | null {
    return localStorage.getItem("tategaki-ni-narou-" + key)
  }

  private setValue(key: string, value: string): void {
    localStorage.setItem("tategaki-ni-narou-" + key, value)
  }

  get useSerifOnNarou(): boolean {
    return this.getValue("serif-font-in-narou") !== "0"
  }

  setSerifOnNarou(value: boolean): void {
    this.setValue("serif-font-in-narou", value ? "1" : "0")
  }

  get isHelpLabelVisible(): boolean {
    return this.getValue("show-help-label") !== "0"
  }

  hideHelpLabel(): void {
    this.setValue("show-help-label", "0")
  }
}
