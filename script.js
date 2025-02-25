let news = []
const getLatestNews = async() =>{
  const url = new URL(`https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines?country=us`)
  console.log("uuu", url)
  const response = await fetch(url)
  const data = await response.json()
  news = data.articles
  console.log("Ddd", data.articles)
}
getLatestNews()