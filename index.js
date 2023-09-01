let sortBtn = false;
const fetchContentNav = async () => {
  const contentNavDiv = document.getElementById('content-navbar');
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
  const data = await res.json();
  data.data.forEach(data => {
    const navBtnDiv = document.createElement('div');
    navBtnDiv.innerHTML = `
        <button onclick=fetchContent(${data.category_id}) class="btn px-8 normal-case">${data.category}</button>
        `;
    contentNavDiv.appendChild(navBtnDiv)
  })


}
fetchContentNav();

const fetchContent = async (id) => {
  const contentDiv = document.getElementById('content-div');
  const noDataDiv = document.getElementById('no-data');
  contentDiv.innerHTML = '';
  noDataDiv.innerHTML = '';

  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
  const data = await res.json();
  if (data.status) {
    const allData = data.data;
    if (sortBtn) {
      const sortData = allData.sort((a, b) => parseFloat(b.others.views.slice(0, -1)) - parseFloat(a.others.views.slice(0, -1)));
      showContent(sortData)
    }
    else {

      showContent(allData)

    }
  }
  else {
    const noData = document.createElement('div');
    noData.innerHTML = `
        <img src="./img/Icon.png">
        <h2 class="text-4xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h2>
        `
    noData.classList = 'flex justify-center items-center flex-col h-[50vh]';
    noDataDiv.appendChild(noData);
  }
}

const showContent = (data) => {
  const contentDiv = document.getElementById('content-div');
  const noDataDiv = document.getElementById('no-data');
  contentDiv.innerHTML = '';
  noDataDiv.innerHTML = '';
  data.forEach(data => {
    const time = hrsAndMin(data.others.posted_date ? data.others.posted_date : 404);
    let timeAgo =``;  
    
    if(time === 404){
      timeAgo=``;
      // timeAgoP.classList.add('hidden');
      console.log("timeAgop");
      
    }
    else{
      timeAgo=`${time.hours}hrs ${time.minutes}min ago`
      // element.classList.add('my-class');
    }

    const card = document.createElement('div');
    card.innerHTML = `

        <figure class="relative">
          <img class='h-48 w-full'
            src="${data.thumbnail}"
            alt="Shoes"
          />
          <p id="time-ago" class="${timeAgo? 'absolute bottom-3 right-3 text-white px-2 py-1 rounded-md text-xs bg-black':'hidden'}">${timeAgo}</p>
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
          ${data.authors[0].verified ? `<img src='/img/fi.svg'>` : ''}
            
          </h2>
          <p class="ms-14">${data.others.views} views</p>
          
          
        </div>
    `;
    card.classList = 'card bg-base-100 shadow-xl'
    contentDiv.appendChild(card);
    const timeAgoP=document.getElementById('time-age');

  })
}

fetchContent(1000);


document.getElementById('sort-btn').addEventListener('click', function (event) {
  console.log("object");
  const sortButton = event.target;
  console.log(sortButton);
  if (sortBtn) {
    sortBtn = false;
    sortButton.classList = 'btn'
    sortButton.textContent = "Sort by view"
    fetchContent(1000)
  }
  else {
    sortBtn = true;
    sortButton.classList = 'btn bg-[#FF1F3D] hover:bg-[#ee4f64] text-white';
    sortButton.textContent = "Sort by Date"
    console.log("false");
    fetchContent(1000)
  }
})

document.getElementById('sort-btn2').addEventListener('click', function (event) {
  console.log("object");
  const sortButton = event.target;
  console.log(sortButton);
  if (sortBtn) {
    sortBtn = false;
    sortButton.classList = 'btn'
    sortButton.textContent = "Sort by view"
    fetchContent(1000)
  }
  else {
    sortBtn = true;
    sortButton.classList = 'btn bg-[#FF1F3D] hover:bg-[#ee4f64] text-white';
    sortButton.textContent = "Sort by Date"
    console.log("false");
    fetchContent(1000)
  }
})


const hrsAndMin = (seconds) => {
  if (seconds === 404) {
    return 404;
  }
  else {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    return { hours, minutes };
  }

}

