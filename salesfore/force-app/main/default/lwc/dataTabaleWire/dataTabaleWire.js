import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
export default class DataTabaleWire extends LightningElement {
    @track data;
    @track columns = [
        {label: 'Id', fieldName: 'Id', type: 'text'},
        {label: 'Label', fieldName: 'Name', type: 'text'},
        {label: 'Phone', fieldName: 'Phone', type: 'phone'},
        {label: 'Industry', fieldName: 'Industry', type: 'text'},
    ];
    @wire (getAccounts) accountRecords({data, error}) {
        if (data) {
            this.data = data;
        }

        if (error) {
            this.error = undefined;
        }
    }
}