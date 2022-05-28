import { api, LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import PLAYER_OBJECT from '@salesforce/schema/Player__c';
import ASSISTS_FIELD from '@salesforce/schema/Player__c.Assists__c';
import BRITHDAY_FIELD from '@salesforce/schema/Player__c.Birthday__c';
import CONTRACT_END_FIELD from '@salesforce/schema/Player__c.Contract_end__c';
import CONTRACT_START_FIELD from '@salesforce/schema/Player__c.Contract_start__c';
import GOALS_SCORED_FIELD from '@salesforce/schema/Player__c.Goals_scored__c';
import KIT_FIELD from '@salesforce/schema/Player__c.Kit__c';
import PLAYER_FULLNAME_FIELD from '@salesforce/schema/Player__c.Fullname__c';
import POSITION_FIELD from '@salesforce/schema/Player__c.Position__c';
import RED_CARD_FIELD from '@salesforce/schema/Player__c.Red_card__c';
import RED_YELLOW_FIELD from '@salesforce/schema/Player__c.Yellow_card__c';
import SALARY_FIELD from '@salesforce/schema/Player__c.Salary__c';
import TEAM_NAME_FIELD from '@salesforce/schema/Player__c.Team_name__c';

export default class EditPlayer extends LightningElement {
    @api recordId;
    @track customFormModal = false;

    @api
    customShowModalPopup() {
        this.customFormModal = true;
    }

    customHideModalPopup() {
        this.customFormModal = false;
    }

    objApiPlayer = PLAYER_OBJECT;
    fields = [PLAYER_FULLNAME_FIELD, BRITHDAY_FIELD,
        TEAM_NAME_FIELD, POSITION_FIELD,
        CONTRACT_START_FIELD, CONTRACT_END_FIELD,
        SALARY_FIELD, KIT_FIELD,
        GOALS_SCORED_FIELD, ASSISTS_FIELD,
        RED_CARD_FIELD, RED_YELLOW_FIELD,
    ];

    handleSubmit() {
        this.template.querySelector('lightning-record-form').submit();
    }

    handleSuccess() {
        const toastEvent = new ShowToastEvent({
            title: "Player has been edit successfully",
            message: "Player Edited",
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
        this.dispatchEvent(new CustomEvent('savesucess'));
        this.customFormModal = false;
    }

    handleCancel() {
        this.customFormModal = false;
    }
}