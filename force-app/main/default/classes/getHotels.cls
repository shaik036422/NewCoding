public with sharing class getHotels {
    @AuraEnabled(Cacheable=true)
    public static List<Hotel__c> gettingHotel(){
     List<Hotel__c> hotelList=[select Name,hotel_image__c,	City__c from Hotel__c ];
     return hotelList;
    }
    @AuraEnabled(cacheable=true)
    public static List<Hotel__c> getHotelRecords(string cityName) {
        List<Hotel__c> lstHotels = [SELECT Name,City__c,hotel_image__c from Hotel__c WHERE Name Like :cityName+'%' OR City__c Like :cityName+'%'];
        return lstHotels;
    }
}