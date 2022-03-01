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
        //console.log(convertToArraySensor);

       // convertToArraySensor.forEach(e => console.log(e))

        
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
                        <div class="col-md-6 px-2">
                            <span class="icon icon-size"><i class="fa-solid fa-mobile-screen-button"></i></span>
                            <h6 style="color:#000;">${details.mainFeatures.displaySize}</h6>
                        </div>

                        <div class="col-md-6">
                            <span class="icon icon-size"><i class="fa-solid fa-camera"></i></span>
                            <h6 style="color:#000;"> ${details.mainFeatures.chipSet}   </h6>
                        </div>

                        <div class="col-md-6">
                          <span class="icon icon-size"><i class="fa-solid fa-memory"></i></span>
                          <h6 style="color:#000;"> ${details.mainFeatures.memory} </h6>
                       </div>
                  
                      <div class="col-md-6">
                          <span class="icon icon-size"><i class="fa-solid fa-hard-drive"></i></span>
                          <h6 style="color:#000;"> ${details.mainFeatures.storage} </h6>
                      </div>
                      <div class="col-md-12">
                        <img src="./images/sensor.png"/> <br>
                        <ul class="list-group d-flex" id="sensor-data">
                            <!-- <li class="list-group-item"> ${ details.mainFeatures.sensors.join(" ")}</li> -->
                            
                        </ul>
                         
                          
                      </div>
                    
                      
                </div>
             <!-- ========== others information =============== -->
                <div class="com-md-12 col-sm-12">
                      <h4 class="text-center my-5">Other Information </h4>
                   <div class="row" id="show-others">
                       <!-- show others Information --->
                   </div>
                </div>
                
           
            </div>
          </div>
          
        </div>

      </div>
        
        `;

          //  console.log(details.mainFeatures.storage);
     //  const getProductDetails = document.getElementById('')


       // call Sensor information 
       displaySensorData(convertToArraySensor);

      // call others Data show 
      displayOthersDataShow(details.others);
        console.log(details);
    }


    /********=============== Sensonr  Method show data in display  =====================*/


    const displaySensorData = async data => {

        const ulSensor = document.getElementById('sensor-data');

        data.forEach(x => {
             //li Element Create 
          const li = document.createElement('li');

          // class  attribute 
          li.setAttribute('class', 'list-group-item');

          li.innerHTML = `<i class="fa-solid fa-check me-2"></i> ${x}` ;

          ulSensor.appendChild(li);

        })
     

    }

    /*******================ others data show =====================*********** */

    const displayOthersDataShow = others => {

      // other information show
      const getOthers = document.getElementById('show-others');
      console.log(others);


      getOthers.innerHTML = `
      <div class="col-md-3">
      <img src="./images/wifi.png"/ class="img-thumbnail">
      <h6 class="mt-3" style="color:#000;">WLAN :  ${(others?.WLAN? others.WLAN :'Not Found')} </h6>
   </div>
   <div class="col-md-3">
      <img src="./images/bluethood.png"/ class="img-thumbnail">
      <h6 style="color:#000;"> Bluetooth :  ${others?.Bluetooth ? others.Bluetooth: 'Not Found'} </h6>
   </div>
   <div class="col-md-3">
      <img src="./images/radio.png"/ class="img-thumbnail">
      <h6 style="color:#000;"> GPS : ${others?.GPS ? others.GPS: "Not Found"} </h6>
   </div>
   <div class="col-md-3">
      <img src="./images/radio.png"/ class="img-thumbnail">
      <h6 style="color:#000;"> NFC :  ${others?.NFC ? others.NFC : "Not Found"} </h6>
   </div>

   <div class="col-md-3">
   <img src="./images/radio.png"/ class="img-thumbnail">
   <h6 class="mt-3" style="color:#000;"> Radio :  ${others?.Radio ? others.Radio: "Not Found"} </h6>
</div>
      `;
     
    }