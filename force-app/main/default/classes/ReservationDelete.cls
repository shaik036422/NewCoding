public with sharing class ReservationDelete {
 @AuraEnabled
 public static void CancelReserv(Id reserid){
    Reservation__c rsrvList=[select Id,Reservation_Status__c,Customer_Name__c,Phone_Number__c,Email_ID__c,Name,Hotel_Name__c from Reservation__c where Id=:reserid];
    if(rsrvList!=null){
        rsrvList.Reservation_Status__c='Cancelled';
        update rsrvList;
    }

 }
}