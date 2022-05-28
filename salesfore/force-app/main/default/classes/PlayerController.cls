public with sharing class PlayerController {
    // List Player
    // @AuraEnabled(cacheable=true)
    // public static List<Player__c> getPlayers() {
    //     return [select Id,
    //                    Fullname__c, 
    //                    Age__c, 
    //                    Birthday__c,
    //                    Assists__c,
    //                    Contract_end__c,
    //                    Contract_start__c,
    //                    Goals_scored__c,
    //                    Kit__c,
    //                    Position__c,
    //                    Salary__c,
    //                    Team_name__r.Name,
    //                    Red_card__c,
    //                    Yellow_card__c
    //                    from Player__c];
    // }

    @AuraEnabled(cacheable=true)
    public static List<Player__c> getPlayers(String searchKey) {
      List<Player__c> players;
      if (String.isNotBlank(searchKey)) {
        String keyString = '%' + searchKey.trim() + '%';
        players = [select Id,
                    Fullname__c, 
                    Age__c, 
                    Birthday__c,
                    Assists__c,
                    Contract_end__c,
                    Contract_start__c,
                    Goals_scored__c,
                    Kit__c,
                    Position__c,
                    Salary__c,
                    Team_name__r.Name,
                    Red_card__c,
                    Yellow_card__c
                    from Player__c where Fullname__c like:keyString];
      } else {
        players = [select Id,
                    Fullname__c, 
                    Age__c, 
                    Birthday__c,
                    Assists__c,
                    Contract_end__c,
                    Contract_start__c,
                    Goals_scored__c,
                    Kit__c,
                    Position__c,
                    Salary__c,
                    Team_name__r.Name,
                    Red_card__c,
                    Yellow_card__c
                    from Player__c];
      }
      return players;
    }
    

    //Search Player
    @AuraEnabled(cacheable=true)
    public static List<Player__c> searchPlayers(String searchKey) {
        String keyString = '%' + searchKey + '%';
        return [select Id,
                        Fullname__c, 
                        Age__c, 
                        Birthday__c,
                        Assists__c,
                        Contract_end__c,
                        Contract_start__c,
                        Goals_scored__c,
                        Kit__c,
                        Position__c,
                        Salary__c,
                        Team_name__r.Name,
                        Red_card__c,
                        Yellow_card__c
                        from Player__c where Fullname__c like:keyString];
    }

    //Delete Player
    @AuraEnabled
    public static void deleteMultiplePlayerRecord(List<Player__c> playerList){  
      delete playerList;  
    }

    // @AuraEnabled
    // public static void deleteMultiplePlayerRecord(String[] idPlayer){
    //   List<Player__c> playerList;
    //   for (String element : idPlayer) {
    //     playerList = [SELECT Id FROM Player__c WHERE Id =:element];
    // }
    //   delete playerList;
    // }
}