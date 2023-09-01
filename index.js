const fetchContentNav = async () => {
    const contentNavDiv = document.getElementById('content-navbar');
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    data.data.forEach(data => {
        const navBtn = document.createElement('button');
        navBtn.innerText = `${data.category}`;
        navBtn.classList = 'btn px-8 normal-case';
        contentNavDiv.appendChild(navBtn)
    })

}
fetchContentNav();

const showContent = async () => {
    const contentDiv = document.getElementById('content-div');
    const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000')
    const data = await res.json();
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

showContent();


