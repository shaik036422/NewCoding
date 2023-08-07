import { LightningElement,wire,track } from 'lwc';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c"
import {MessageContext, publish} from 'lightning/messageService'
import GetRecords from '@salesforce/apex/GetReservRecords.GetRecords';
export default class ReserveUpdateComponent extends LightningElement {
    visibleRates;
    recordIdVal;
fullTableData=[]
 filteredData=[]
 datascoll;
 @wire(MessageContext)
 context

 timer 
 filterBy="Reservation Id";
headings=[ "Reservation Id", "Customer Name", "Status","Select To Cancel"]
@wire(GetRecords)
GetAllRecords({data,error}){
    if(data){
        this.fullTableData=data;
        this.filteredData=data;
    }
    if(error){
        console.log(error);
    }
}
get FilterByOptions(){
    return [
        {label:"All", value:'All'},
        {label:"Reservation Id", value:'Name'},
        {label:'Customer Name', value:'Customer_Name__c'}
       
    ]
}
filterbyHandler(event){
    this.filterBy = event.target.value
}

filterHandler(event){
    const {value} = event.target
    window.clearTimeout(this.timer)
    if(value){
        this.timer = window.setTimeout(()=>{
            console.log(value)
            this.filteredData = this.fullTableData.filter(eachObj=>{
                if(this.filterBy === 'All'){
                    /**Below logic will filter each and every property of object */
                    return Object.keys(eachObj).some(key=>{
                        return eachObj[key].toLowerCase().includes(value)
                    })
                } else {
                     /**Below logic will filter only selected fields */
                    const val = eachObj[this.filterBy] ? eachObj[this.filterBy]:''
                    return val.toLowerCase().includes(value)
                }
            })
        }, 500)
        
    } else {
        this.filteredData = [...this.fullTableData]
    }
    
}
updateDataHandler(event){
    this.visibleRates=[...event.detail.records]
        console.log(event.detail.records)
    }
    publishMessage(event){
        const selectedId=event.target.value;
        this.recordIdVal = selectedId;
        const message={
            lmsData:{
                value: this.recordIdVal
            }
        }
        publish(this.context, SAMPLEMC, message)
    }
    
}