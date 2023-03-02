export const checkIfImage = (url) => {
  if (url) {
    if (typeof url === 'string') {
      var value = url.split('.')
      var length = value.length
      if (
        value[length - 1].toLowerCase().includes('png') ||
        value[length - 1].toLowerCase().includes('jpg') ||
        value[length - 1].toLowerCase().includes('jpeg')
      )
        return true
      else return false
    } else return false
  } else return false
}
