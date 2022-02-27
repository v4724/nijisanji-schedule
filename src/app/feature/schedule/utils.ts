
export function enumList (enumObj :any): Array<string> {
  return Object.keys(enumObj)
}

export function openUrl (url: string) {
  window.open(url, '_blank')
}
