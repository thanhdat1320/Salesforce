import { LightningElement, track, wire, api } from 'lwc';
import getPlayers from '@salesforce/apex/PlayerController.getPlayers';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import deleteMultiplePlayerRecord from '@salesforce/apex/PlayerController.deleteMultiplePlayerRecord';
import { refreshApex } from '@salesforce/apex';

const COLUMNS = [
    {
        label: 'Fullname', fieldName: 'Fullname', type: 'text', sortable: true,
        cellAttributes: { alignment: 'left' }
    },
    { label: 'Age', fieldName: 'Age', type: 'text' },
    { label: 'Position', fieldName: 'Position', type: 'text' },
    { label: 'Team Name', fieldName: 'Team_name', type: 'text' },
    {
        label: 'Edit',
        type: 'button-icon',
        initialWidth: 60,
        typeAttributes: {
            iconName: 'action:edit',
            name: 'edit'
        }
    },
    {
        label: 'Detail',
        type: 'button-icon',
        initialWidth: 60,
        typeAttributes: {
            iconName: 'action:info',
            name: 'show_details'
        }
    }
];

export default class ListPlayers extends LightningElement {
    columns = COLUMNS;
    recordId;
    listPlayer;
    preData;
    setSelectedRows = [];
    visiblePlayer;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;
    selectedRecords = [];
    selectedIds = [];
    searchKey = '';

    // List Player
    @wire(getPlayers, { searchKey: '$searchKey' })
    playerRecords(result) {
        this.preData = result;
        if (result.data) {
            this.listPlayer = convertData(result.data);
        } else {
            console.log(result.error);
        }
    }

    //Get data paging from paging component
    updatePlayerHandler(event) {
        this.visiblePlayer = [...event.detail.records]
    }

    //Get data search from seach component
    handelSearchValue(event) {
        this.listPlayer = convertData(event.detail);
        this.visiblePlayer = this.listPlayer;
    }

    //Call create from create component
    customShowModalPopup() {
        this.template.querySelector('c-create-Player').customShowModalPopup();
    }

    //Handle after create and edit 
    handleAfterSuccess() {
        refreshApex(this.preData)
    }

    // Delete Player
    deletePlayerRowAction() {
        let selectedRecords = this.template.querySelector("lightning-datatable").getSelectedRows();
        if (selectedRecords == '') {
            const toastEvent = new ShowToastEvent({
                title: 'Warning!',
                message: 'Please select the player you want to delete!',
                variant: 'error'
            });
            this.dispatchEvent(toastEvent);
        } else if (confirm('Want to delete?') && selectedRecords !== '') {
            deleteMultiplePlayerRecord({ playerList: selectedRecords })
                .then(() => {
                    const toastEvent = new ShowToastEvent({
                        title: 'Success!',
                        message: 'Record deleted successfully',
                        variant: 'success'
                    });
                    this.setSelectedRows = [];
                    this.dispatchEvent(toastEvent);
                    refreshApex(this.preData);
                })
                .catch(() => {
                    const toastEvent = new ShowToastEvent({
                        title: 'Warning!',
                        message: 'Can not delete!!',
                        variant: 'warning'
                    });
                    this.dispatchEvent(toastEvent);
                })
        }
    }

    // deletePlayerRowAction() {
    //     let selectedRecords = this.template.querySelector("lightning-datatable").getSelectedRows();
    //     selectedRecords.forEach(currentItem => {
    //         this.selectedIds.push(currentItem.Id)
    //     });
    //     if (this.selectedIds.length === 0) {
    //         const toastEvent = new ShowToastEvent({
    //             title: 'Warning!',
    //             message: 'Please select the player you want to delete!',
    //             variant: 'error'
    //         });
    //         this.dispatchEvent(toastEvent);
    //     } else {
    //         this.template.querySelector('c-delete-Player').deletePlayerRowAction();
    //         // this.setSelectedRows = [];
    //     }
    // }

    //Sort by name
    sortBy(field, reverse, primer) {
        const key = primer
            ? function (x) {
                return primer(x[field]);
            }
            : function (x) {
                return x[field];
            };

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.visiblePlayer];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.visiblePlayer = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.recordId = row.Id;
        switch (actionName) {
            case 'edit':
                this.template.querySelector('c-edit-Player').customShowModalPopup();
                break;
            case 'show_details':
                this.template.querySelector('c-detail-Player').customShowModalPopup();
                break;
            default:
        }
    }
}

function convertData(data) {
    let prePlayers = [];
    if (data) {
        data.forEach(player => {
            let prePlayer = {};
            if (typeof player.Team_name__r != 'undefined') {
                prePlayer.Team_name = player.Team_name__r.Name;
            } else {
                prePlayer.Team_name = "";
            }
            prePlayer.Id = player.Id;
            prePlayer.Fullname = player.Fullname__c;
            prePlayer.Name = player.Name;
            prePlayer.Position = player.Position__c;
            prePlayer.Age = player.Age__c;
            prePlayer.Kit = player.Kit__c;
            prePlayer.Salary = player.Salary__c;
            prePlayers.push(prePlayer);
        });
    }
    return prePlayers;
}