const API_KEY = ``; // 과제용 API_KEY
let newsList = []
const getLatestNews = async() =>{

  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`) // 배포용

  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`) // 과제용

  console.log("uuu", url)
  const response = await fetch(url)
  console.log(response)
  const data = await response.json()
  newsList = data.articles
  render()
  console.log("Ddd", newsList)
}
const render=() =>{
  const newsHTML = newsList.map(
    (news)=>`<div class="row news">
          <div class="col-lg-4">
             <img class="news-img"
     src="${news.urlToImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeG8eNGIrLcY_4JsLdQS_GmbtCrsh-PvXWaQ&s'}"
     onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeG8eNGIrLcY_4JsLdQS_GmbtCrsh-PvXWaQ&s';"/>


          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
              ${
                news.description == null || news.description == ""
        ? "내용없음"
        : news.description.length > 200
        ? news.description.substring(0, 200) + "..."
        : news.description
              }
            </p>
            <div>${news.source.name || "no source"} * ${moment(
        news.publishedAt
     ).fromNow()}</div>

          </div>
        </div>
    `).join('')
  document.getElementById("news-board").innerHTML=newsHTML
}
getLatestNews()


/* 모바일 사이드 메뉴 */
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

/* 검색창 */
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};
