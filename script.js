let news = []
const getLatestNews = async() =>{
  const url = new URL(`https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines?country=us&page=1&pageSize=20`)
  // https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines?q=아이유
  // https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines?page=1&pageSize=20
  // const url = new URL(
  //   `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=20`
  // );
  console.log("uuu", url)
  const response = await fetch(url)
  const data = await response.json()
  news = data.articles
  console.log("Ddd", data.articles)
}
getLatestNews()