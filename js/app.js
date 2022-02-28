// console.log("phone gunner")

/*****================ Load moblie product by search ===================*** */

const loadMoblieApi =  async()=>{

    try{
        const apiUrl = await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`);
        const apiUrlData = await apiUrl.json();

        console.log(apiUrlData);

    }catch(error){
        console.log(error);
    }
}

loadMoblieApi();