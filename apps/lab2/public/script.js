document.addEventListener('DOMContentLoaded', () => {
  const cardImages = document.querySelectorAll('.team-cards .card img')

  cardImages.forEach((img) => {
    fetch('https://dog.ceo/api/breeds/image/random', { cache: 'no-store' })
      .then(response => response.json())
      .then((data) => {
        img.src = data.message
      })
      .catch((error) => {
        console.error('Error fetching dog image:', error)
      })
  })
})
