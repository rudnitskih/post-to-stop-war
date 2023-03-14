async function downloadImage(imageSrc, imageName) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageURL
  link.download = imageName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// temp1 copied messages response
temp1.forEach(async ({Poster, Date}, i) => {


  setTimeout(() => { console.log(i, temp1.length); downloadImage(Poster[0].thumbnails.large.url, `${Date}`)}, i * 100)
})
