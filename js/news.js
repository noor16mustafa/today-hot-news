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

const displayCategorie = (categories) => {
    //console.log(categories);
    const categoryList = document.getElementById('category-list');

    for (const category of categories) {
        //console.log(category.category_name);
        const categoryName = document.createElement('a');
        categoryName.setAttribute("href", "#");
        categoryName.classList.add("flex-sm-fill", "text-sm-center", "nav-link", "text-secondary", "fs-5");
        categoryName.innerText = `${category.category_name}`;

        categoryList.appendChild(categoryName);
    }


}

loadCategories();