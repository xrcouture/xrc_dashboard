import SecureLS from 'secure-ls'

export const getItemFromLocalStorage = (key) => {
  return new SecureLS({ encodingType: 'aes' }).get(key)
}

export const setItemOnLocalStorage = (key, value) => {
  new SecureLS({ encodingType: 'aes' }).set(key, value)
}

export const removeItemOnLocalStorage = (key) => {
  new SecureLS({ encodingType: 'aes' }).remove(key)
}

export const clearValuesOnLogout = () => {
  new SecureLS({ encodingType: 'aes' }).removeAll()
}
