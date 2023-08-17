import { LightningElement,track,wire } from 'lwc';
import gettingHotel from '@salesforce/apex/getHotels.gettingHotel';
import getHotelRecords from '@salesforce/apex/getHotels.getHotelRecords';
export default class HotelImages extends LightningElement {
   @track hotelimages;
   @track cityNameSrch;
   @track searchedres;
   timeoutId;
   @track serchvalue=false;
   changeHandler(event){
    this.cityNameSrch=event.target.value;
    this.serchvalue=true;
    if(event.target.value === ''){
        this.serchvalue = false;
    }
   }
    @wire(gettingHotel)
getrecords({data,error}){
    if(data){
        this.hotelimages=data;
    }
    if(error){
        alert('no records founnd')
    }
}

@wire(getHotelRecords,{cityName:"$cityNameSrch"})
hotelimaes({data,error}){
    if(data){
        this.searchedres=data;
        console.log(this.searchedres)
    }
    if(error){
        alert('no records found')
    }
}




}