// Not yet work correct
export function generateEmbedFB (content) {
  let newContent
  const fbTagStr = '[facebook'
  const urls = []

  let url = []
  let begin
  for (let i = 0; i < content.length; ++i) {
    if (content.charAt(i) === '[' && content.length > (i + fbTagStr.length)) {
      if (fbTagStr.split('').every((char, index) => char === content.charAt(i + index))) {
        begin = i
        const firstCharOfUlrIndex = i + fbTagStr.length + 1
        url.push(content.charAt(firstCharOfUlrIndex))
        i = firstCharOfUlrIndex
      }
    } else {
      if (content.charAt(i) === ']' && begin && url.length) {
        urls.push(
          {
            url: url.join(''),
            begin
          }
        )
        url = []
      }
      if (url.length > 0 && content.charAt(i) !== ' ') {
        url.push(content.charAt(i))
      }
    }

  }

  newContent = content.split('')
  urls.forEach((urlData) => {
    const embedCode = `
      <iframe
        src="https://www.facebook.com/plugins/post.php?href=${window.encodeURI(urlData.url)}&show_text=false&appId=1411983035767659"
        data-width="auto"
        style="border:none;overflow:hidden;" 
        scrolling="no" 
        frameborder="0"
        allowTransparency="true"
        allow="encrypted-media"
        allowFullScreen="true"
      /> 
      
      `

    newContent.splice(urlData.begin, urlData.url.length + fbTagStr.length + ' ]'.length, ...embedCode.split(''))
  })

  return newContent.join('')
}
