public with sharing class DeletePlayerController {
    @AuraEnabled
    public static void deleteMultiplePlayerRecord(List<Player__c> playerList){  
      delete playerList;  
    }  
}