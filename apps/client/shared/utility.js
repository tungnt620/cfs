export const currencyConverter = (value) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
  return formatter.format(+value)
}

export const numberFormatter = (value) => {
  const formatter = new Intl.NumberFormat('vi-VN')
  return formatter.format(+value)
}

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value)
}

export const randomID = () => {
  return '_' + Math.random().toString(36).substr(2, 9)
}

export const generateString = (length) => {
  let random_string = ''
  let random_ascii
  for (let i = 0; i < length; i++) {
    random_ascii = Math.floor((Math.random() * 25) + 97)
    random_string += String.fromCharCode(random_ascii)
  }
  return random_string
}

export const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1])
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ab], { type: mimeString })
}
