const loadCategories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategorie(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

//display category section

const displayCategorie = (categories) => {

    const categoryList = document.getElementById('category-list');


    for (const category of categories) {

        const categoryName = document.createElement('a');
        categoryName.setAttribute("href", "#");
        categoryName.setAttribute('onclick', 'loadNews(\'' + `${category.category_id}` + '\');');
        categoryName.classList.add("flex-sm-fill", "text-sm-center", "nav-link", "text-dark", "fs-5", 'style1');

        categoryName.innerText = `${category.category_name}`;

        categoryList.appendChild(categoryName);
    }


}

//*********************load news by category******************

const loadNews = async (category_id) => {

    //start loader
    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);

    }
    catch (error) {
        console.log(error);
    }
}

//************sort by views

const sortByViews = (datas) => {
    datas.sort((a, b) => {
        return b.total_view - a.total_view;
    })
}

//******************** */ display news*****************

const displayNews = (newses) => {
    sortByViews(newses);

    //display how many  news found

    const newsfound = document.getElementById('news-found');
    newsfound.textContent = '';
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('bg-secondary', 'p-4');
    messageDiv.innerHTML = `
    <h5 class="text-center">${newses.length === 0 ? 'No News Available' : newses.length + ' items found'}  </h5>`;
    newsfound.appendChild(messageDiv);



    const getDisplayNews = document.getElementById('display-news');
    getDisplayNews.textContent = '';

    //display all news by category

    newses.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
    <div class="card mb-3 bg-success p-2 text-dark bg-opacity-50">
                    <div class="row g-0 p-4">
                        <div class="col-md-4">
                            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title fw-bold">${news.title}</h5>
                                <p class="card-text pt-4">${news.details.length > 400 ? news.details.slice(0, 400) + '....' : news.details}</p>
                              
                            </div>
                            <div class="card-body">
                            <div class="row ">
                            <div class="col">
                              <img src="${news.author.img}" style="height:50px;width:50px;" class="img-fluid rounded-circle">
                              <p class="card-text d-inline ms-2 fw-bold">${news.author.name === '' || news.author.name === null ? 'No data Available' : news.author.name}</p>
                             
                            </div>
                            <div class="col ps-4">
                            <i class="fa-solid fa-eye mt-3"></i>
                            <p class="card-text d-inline ms-2 fw-bold">${news.total_view === null ? 'No views' : news.total_view}</p>
                            </div>
                            <div class="col text-end mt-3">
                            <a href="#" onclick="loadModalDetail('${news._id}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalForDisplayNews">See Details<i class="fa-solid fa-arrow-right p-2"></i></a>
                           
                            </div>
                          </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        getDisplayNews.appendChild(newsDiv);
    });
    //stop loader
    toggleSpinner(false);
}

//************load modal information with id********

const loadModalDetail = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayModalDetails(data.data[0]);
    } catch (error) {
        console.log(error);
    }
}

//**********display modal with news details*******

const displayModalDetails = (modalData) => {

    const getModalById = document.getElementById('modal-detail');
    getModalById.textContent = '';
    const modalDisplay = document.createElement('div');
    modalDisplay.classList.add('modal-content');
    modalDisplay.innerHTML = `
    <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Author: ${modalData.author.name === '' || modalData.author.name === null ? 'Unknown publisher' : modalData.author.name}</h5>
                            
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <p><span class="text-danger fw-bold">Published Date:</span> ${modalData.author.published_date}<p/>
                        
                        <img style="max-width:400px;" src="${modalData.image_url}">
                        <p>News: ${modalData.details}</p>
                        </div>
                        <div class="modal-footer">
                        <p>Ratings: <span class="text-primary fw-bold">${modalData.rating.number}</span> <p/>
                        <p>Badge: <span class="text-danger fw-bold">${modalData.rating.badge}</span> <p/>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            
                        </div>`;
    getModalById.appendChild(modalDisplay);
}

//toggle spinner 

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none');
    }
}

loadCategories();