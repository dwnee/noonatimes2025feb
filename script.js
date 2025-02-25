const API_KEY = `b3890c85e6f94350bca0576090671f11`
let news = []
const getLatestNews = async() =>{
  const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
  console.log("uuu", url)
  const response = await fetch(url)
  const data = await response.json()
  news = data.articles
  console.log("Ddd", data.articles)
}
getLatestNews()