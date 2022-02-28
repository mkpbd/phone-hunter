// console.log("phone gunner")

/*****================ Load moblie product by search ===================*** */

const loadMoblieApi =  async()=>{

    try{
        const apiUrl = await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`);
        const apiUrlData = await apiUrl.json();

        // console.log(apiUrlData);
          await displayMobileData(apiUrlData);

    }catch(error){
        console.log(error);
    }
}

loadMoblieApi();


const displayMobileData = async (datas)=>{
   
    // parent Id 
    const showAllMobileByParentGridId = document.getElementById('show-all-phone');

    // get only mobile data from api 
    const mobileDataArray = datas.data;

    mobileDataArray.forEach(data => {
    
     // create child elements div
    const div = document.createElement('div');
    div.setAttribute('class', 'col');

        div.innerHTML = `
   
        <div class="card shadow p-3 mb-5 bg-body rounded border-0">
          <img src="${data.image}" alt="...">
          <div class="card-body">
            <h5 class="card-title title-font-face text-center">${data.phone_name}</h5>
            <h5 class="card-title title-font-face text-center">${data.brand}</h5>
          </div>
        </div>
    
        `

      //  console.log(div)
        showAllMobileByParentGridId.appendChild(div);
    });
 

    
    


 

    
    console.log(mobileDataArray);
}