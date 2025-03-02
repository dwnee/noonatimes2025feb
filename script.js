const API_KEY = ``; // 과제용 API_KEY
let newsList = [];
const menus = document.querySelectorAll(".menu-common button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let url = new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;
const getNews = async () => {
  try {
    url.searchParams.set("page", page); // &page=page
    url.searchParams.set("pageSize", pageSize);
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};
const getLatestNews = async () => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  ); // 배포용
  // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`) // 과제용
  await getNews();
};
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`) // 과제용
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`
  ); // 배포용
  page = 1;
  await getNews();
};
const getNewsByKeyword = async (event) => {
  const keyword = document.getElementById("search-input").value;
  // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`) // 과제용
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`
  ); // 배포용
  await getNews();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
          <div class="col-lg-4">
             <img class="news-img"
     src="${
       news.urlToImage ||
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeG8eNGIrLcY_4JsLdQS_GmbtCrsh-PvXWaQ&s"
     }"
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
    `
    )
    .join("");
  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};
const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }

  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = ``;
  if (page == 1) {
    paginationHTML = ``;
  } else if (page >= 2 && page <= groupSize) {
    paginationHTML = `
  <li class="page-item" onclick="MoveToPage(${page - 1})"><a class="page-link">&lt;</a></li>`;
  } else {
    paginationHTML = `<li class="page-item" onclick="MoveToPage(1)"><a class="page-link">&lt;&lt;</a></li>
  <li class="page-item" onclick="MoveToPage(${
    page - 1
  })"><a class="page-link">&lt;</a></li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="MoveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }

  if (page == totalPages) {
    paginationHTML += ``;
  } else if(page>=(totalPages-groupSize+1) && page<=(totalPages -1)){
    paginationHTML += `<li class="page-item" onclick="MoveToPage(${page + 1
    })"><a class="page-link">&gt;</a></li>`;
  }
  else{
    paginationHTML += `
    <li class="page-item" onclick="MoveToPage(${
      page + 1
    })"><a class="page-link">&gt;</a></li>
    <li class="page-item" onclick="MoveToPage(${totalPages})"><a class="page-link">&gt;&gt;</a></li>`;
  }
  document.querySelector(".pagination").innerHTML = paginationHTML;

  {
    /* <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav> */
  }
};
const MoveToPage = (pageNum) => {
  console.log("move to page", pageNum);
  page = pageNum;
  getNews();
};
getLatestNews();

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
