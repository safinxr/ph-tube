const fetchContentNav = async () => {
    const contentNavDiv = document.getElementById('content-navbar');
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    data.data.forEach(data => {
        const navBtnDiv = document.createElement('div');
        navBtnDiv.innerHTML = `
        <button onclick=showContent(${data.category_id}) class="btn px-8 normal-case">${data.category}</button>
        `;
        contentNavDiv.appendChild(navBtnDiv)
    })


}
fetchContentNav();

const showContent = async (id) => {
    const contentDiv = document.getElementById('content-div');
    const noDataDiv = document.getElementById('no-data');
    contentDiv.innerHTML='';
    noDataDiv.innerHTML='';
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    if(data.status){
      data.data.forEach(data => {
        const card = document.createElement('div');
        card.innerHTML = `

        <figure>
              <img class='h-48 w-full'
                src="${data.thumbnail}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body px-4 py-5">
              <div class="flex justify-start items-center">
                <div class="avatar">
                  <div class="w-10 rounded-full">
                    <img src="${data.authors[0].profile_picture}">
                  </div>

                </div>
                <h2 class="card-title ms-4">${data.title}</h2>
              </div>               
              <h2 class="card-title ms-14 font-normal text-base">
              ${data.authors[0].profile_name} 
              ${data.authors[0].verified?`<img src='/img/fi.svg'>`:''}
                
              </h2>
              <p class="ms-14">${data.others.views} views</p>
              
              
            </div>
        `;
        card.classList = 'card bg-base-100 shadow-xl'
        contentDiv.appendChild(card);

    })
    }
    else{
      const noData = document.createElement('div');
        noData.innerHTML =`
        <img src="./img/Icon.png">
        <h2 class="text-4xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h2>
        `
        noData.classList='flex justify-center items-center flex-col h-[50vh]';
        noDataDiv.appendChild(noData);
    }
    


}

showContent(1000);


