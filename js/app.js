const allProduct = document.getElementById('show-all-phone');
const productDeatils = document.getElementById('phone-details-show');

//global Arraylength
let totalProductArrayLength  = 0;
let totalProduct = [];

// console.log("phone gunner")

/*****================ Load moblie product by search ===================*** */

const loadMoblieApi =  async()=>{

    try{
        const inputField = document.getElementById('input-field');
        const inputFieldValue = inputField.value.toLowerCase();
        //clear Fields 
        inputField.value = '';
        // validation Method

         

       // debugger
        if(inputFieldValue.trim() == ''){
      
          // show error message 
          showError('show', "Plase Enter your Product Name");
          // clear html content
          clearFieldOrInnerText();
          return;
        }
    
        // cheack input file is not nummber
        if(!isNaN(inputFieldValue)){
    
          // Show Error message 
           showError('show', "Number are not allowed");
           clearFieldOrInnerText();
    
          return;
        }
        // previou loader;

        snipperLoad();
       

        // console.log('input values = ', inputFieldValue)
         const apiUrl = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`);
       // const apiUrl = await fetch(`https://openapi.programming-hero.com/api/phones?search=samsung`);
        const apiUrlData = await apiUrl.json();

        // console.log(apiUrlData);
          await displayMobileData(apiUrlData);

    }catch(error){
        console.log(error);
    }
}

//loadMoblieApi();


// default shome product Load html from 

const defaultSomeProductLoad = async () => {
  try{
 
   const apiUrl = await fetch(`https://openapi.programming-hero.com/api/phones?search=samsung`);
    const apiUrlData = await apiUrl.json();

    // console.log(apiUrlData);
      await displayMobileData(apiUrlData);

}catch(error){
    console.log(error);
}

}

defaultSomeProductLoad();


// key press event 

document.getElementById('input-field').addEventListener('keypress', function(event){
 

  console.log(event.keyCode == 13)
 if(event.key == "Enter"){
  loadMoblieApi();
  event.preventDefault();
 }
//  event.preventDefault();
  

})

/*********** --------- snipper ---------------************ */

const snipperLoad = () =>{
  const spinner = document.getElementById('spinner');
  spinner.classList.remove('d-none');
  clearFieldOrInnerText();
  setTimeout(e => {
    spinner.classList.add('d-none');
  }, 2000);

}

/********------------ Clear field  or inner text -----------************ */
const clearFieldOrInnerText = () => {
     //Clear all fields
     allProduct.innerText = '';
     // cleaer produce deatisl
     productDeatils.innerText = '';

}


/********** ============ display mobile data in html Page ======================************* */
const displayMobileData = async (datas)=>{
   
    // parent Id 
    const showAllMobileByParentGridId = document.getElementById('show-all-phone');
  // clear previus data 
  showAllMobileByParentGridId.innerText = '';
    // get only mobile data from api 
    const mobileDataArray = datas.data;
    // array length 
    const mobileDataArrayLenght = mobileDataArray.length;

    // assign Globally Total array length 
      totalProductArrayLength = mobileDataArrayLenght;
      // assign  globally total product 
      totalProduct = mobileDataArray;

    if(mobileDataArray == null || mobileDataArrayLenght <= 0){
     // alert("no mobile found");
      showError('show');
      phoneDetailsDisplayShow(null);
      return;
    }

    // console.log(mobileDataArrayLenght);
    // let count =1;
    // let limit = filterLimitButton(0);

    showMoreDataByProductLength(mobileDataArray,   20, showAllMobileByParentGridId);
    filterFunction();
   
    // console.log(mobileDataArray);
  
    // loadmore button 
    loadMoreButtonShow(mobileDataArrayLenght);

  }



// Show More Data By array length

const showMoreDataByProductLength = (mobileDataArray, end = 20, showAllMobileByParentGridId) => {

  mobileDataArray.slice(0,end).forEach(data => {
    
   
    // create child elements div
   const div = document.createElement('div');
   div.setAttribute('class', 'col');
       div.innerHTML = `
       <div class="card shadow p-3 mb-5 bg-body rounded-3 border-0">
         <img src="${data.image}" alt="...">
         <div class="card-body text-center">
           <h5 class="card-title title-font-face text-center">${data.phone_name}</h5>
           <h5 class="card-title title-font-face text-center">${data.brand}</h5>
           <button type="button" class="btn btn-outline-primary text-center" onclick="showMobileDetails('${data.slug}')">View Details <i class="fa-solid fa-eye mx-2"></i></button>
         </div>
       </div>
   
       `

     //  console.log(div)

   
     // show filter



        // limit products Show 
       //  count++;
       //  if(count >= limit){
       //   const showMoreButton = document.getElementById('show-more');
       //       showMoreButton.style.display = 'block';
       //       showMoreButton.classList.remove('d-none');

       //       document.getElementById('show-button').onclick = `${filterLimitButton(mobileDataArrayLenght)}`;
       // //  return ;
       // } 
 
       showAllMobileByParentGridId.appendChild(div);
   });


}


// show All product by load more button 

document.getElementById('show-button').addEventListener('click',function(event){
  allProduct.innerText = '';
  showMoreDataByProductLength(totalProduct, totalProductArrayLength,allProduct);
  loadMoreButtonShow(totalProductArrayLength);

})



// Filter option 
  const filterLimitButton = (limit )=>{

     console.log(limit);
    return (limit || 10)
  }

// show More button 


    
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
        if(details == null){
          getParentId.innerText = '';
          return;
        }
         
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
          <div class="col-md-4">
                <img src="./images/wifi.png"/ class="img-thumbnail">
                <h6 class="mt-3" style="color:#000;">WLAN :  ${(others?.WLAN? others.WLAN :'Not Found')} </h6>
          </div>
          <div class="col-md-4">
              <img src="./images/bluethood.png"/ class="img-thumbnail">
              <h6 style="color:#000;"> Bluetooth :  ${others?.Bluetooth ? others.Bluetooth: 'Not Found'} </h6>
          </div>
          <div class="col-md-4">
              <img src="./images/radio.png"/ class="img-thumbnail">
              <h6 style="color:#000;"> GPS : ${others?.GPS ? others.GPS: "Not Found"} </h6>
          </div>
          <div class="col-md-4">
              <img src="./images/radio.png"/ class="img-thumbnail">
              <h6 style="color:#000;"> NFC :  ${others?.NFC ? others.NFC : "Not Found"} </h6>
          </div>

          <div class="col-md-4">
            <img src="./images/radio.png"/ class="img-thumbnail">
            <h6 class="mt-3" style="color:#000;"> Radio :  ${others?.Radio ? others.Radio: "Not Found"} </h6>
        </div>
      `;
     
    }

    
  // clear error message 




    // const show error method 

  const showError = (displayShow, message = "Sorry your search product not found !!") => {
    const showErrorMessage =   document.getElementById('show-error-message');

  

  const error =   `
  <div class="col-md-8 mx-auto col-sm-10">
    <div class="toast ${displayShow} align-items-center w-100" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body w-100 d-block text-center">
          <h2 class="text-center text-danger"> ${message} </h2>
    </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
<div>
  
  `;


    showErrorMessage.innerHTML = error;
    setTimeout((e) => {
      showErrorMessage.innerText = '';
     // console.log("hello time out")
    },3000);

  }



  // filter whork heare 

const filterFunction = () => {

  // const value =  document.getElementById('show-all-phone');
  // const convetArray = Array.from(value.children);
  // console.log("ide value", convetArray.slice(0,5))
  // value.innerText = '';
  // for( const key of convetArray.slice(0,12)){
    
  //   //console.log(key, convetArray[key]);
  //   value.appendChild(key);

  // }
}



const loadMoreButtonShow = (productLength)=> {
  const loadMore = document.getElementById('show-more');
 const allProduct =  document.getElementById('show-all-phone');
  //const cheackMobleProductLength = Array.from(allProduct);
  if(productLength > 20){
    //loadMore.style.display = 'block'
    loadMore.classList.remove('d-none')
 
  }
  else{
    loadMore.classList.add('d-none')
  }

  if(productLength === allProduct.childElementCount){
    loadMore.classList.add('d-none');
  }
  
  console.log("Length Of array" ,productLength)
  // console.log('show html array length ', allProduct.childElementCount)



}