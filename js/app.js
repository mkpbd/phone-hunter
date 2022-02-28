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
          <div class="card-body text-center">
            <h5 class="card-title title-font-face text-center">${data.phone_name}</h5>
            <h5 class="card-title title-font-face text-center">${data.brand}</h5>
            <button type="button" class="btn btn-outline-primary text-center" onclick="showMobileDetails('${data.slug}')">View Details <i class="fa-solid fa-eye mx-2"></i></button>
          </div>
        </div>
    
        `

      //  console.log(div)
        showAllMobileByParentGridId.appendChild(div);
    });

    
   // console.log(mobileDataArray);
}


    
    /*************===================== Show Mobile Details ===================*******************/


    const showMobileDetails = async(slug)=>{

        try{
            //get mobile details by slug Id
            const detailsApiUrl = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
            // convert data json format to javascrit object
            const dataUrlJson = await detailsApiUrl.json();

            //console.log(dataUrlJson);
            phoneDetailsDisplayShow(dataUrlJson.data);

        }catch(error){

            console.log(error);
        }
      //  console.log(slug)
    }
    
    // prduct detials show
    const phoneDetailsDisplayShow = details =>{
       
        const getParentId = document.getElementById('phone-details-show');
        
        const convertToArraySensor = Array.from(details.mainFeatures.sensors);
        console.log(convertToArraySensor);

        convertToArraySensor.forEach(e => console.log(e))

        
        getParentId.innerHTML = `
        <div class="card shadow p-3 mb-5 bg-body rounded border-0" >
        <div class="row g-4">
          <div class="col-md-4">
            <img src="${details.image}" class="img-fluid rounded-start w-100" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title title-font-face">Name: ${details.name}</h5>
                <h6 class="card-text title-font-face brand-font-size">Barand Name: ${details.brand}</h6>
                <h6 class="card-text title-font-face release-font-size">${details.releaseDate != '' ? details.releaseDate: 'Release Date not found'}</h6>
                
                <div class="row">
                        <div class="col-md-4">
                            <span class="icon icon-size"><i class="fa-solid fa-mobile-screen-button"></i></span>
                            <div>${details.mainFeatures.displaySize}</div>
                        </div>
                        <div class="col-md-4">
                            <span class="icon icon-size"><i class="fa-solid fa-camera"></i></span>
                            <div> ${details.mainFeatures.chipSet}   </div>


                        </div>
                        <div class="col-md-4">
                            <span class="icon icon-size"><i class="fa-solid fa-battery-full"></i></span>
                        </div>
                        <div class="col-md-4">
                            <img src="./images/sensor.png"/> <br>
                            <ul class="list-group">
                            <li class="list-group-item"> ${ details.mainFeatures.sensors.join(" ")}</li>
                               
                            </ul>
                         
                          
                        </div>
                        <div class="col-md-4">
                            <span class="icon icon-size"><i class="fa-solid fa-memory"></i></span>
                            <div> ${details.mainFeatures.memory} </div>
                        </div>
                      
                        <div class="col-md-4">
                            <span class="icon icon-size"><i class="fa-solid fa-hard-drive"></i></span>
                            <div> ${details.mainFeatures.storage} </div>
                        </div>
                      
                </div>
           
            </div>
          </div>
        </div>
      </div>
        
        `;

          //  console.log(details.mainFeatures.storage);
     //  const getProductDetails = document.getElementById('')
       
        console.log(details);
    }