import { api, LightningElement } from 'lwc';
import deleteMultiplePlayerRecord from '@salesforce/apex/PlayerController.deleteMultiplePlayerRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
import { deleteRecord } from 'lightning/uiRecordApi';


export default class DeletePlayer extends LightningElement {
    @api selectedIds = [];

    @api
    deletePlayerRowAction() {
        console.log([...this.selectedIds])
        if (confirm('Want to delete?') && selectedIds !== '') {
            deleteMultiplePlayerRecord({ idPlayer: this.selectedIds })
                .then((result) => {
                    console.log(result.data)
                    console.log(this.selectedIds)
                    const toastEvent = new ShowToastEvent({
                        title: 'Success!',
                        message: 'Record deleted successfully',
                        variant: 'success'
                    });
                    this.selectedIds = [];
                    this.dispatchEvent(toastEvent);
                })
            // deleteMultiplePlayerRecord({ playerList: this.selectedIds })
            //     .then(() => {
            //         const toastEvent = new ShowToastEvent({
            //             title: 'Success!',
            //             message: 'Record deleted successfully',
            //             variant: 'success'
            //         });
            //         this.setSelectedRows = [];
            //         this.dispatchEvent(toastEvent);
            //         refreshApex(this.preData);
            //     })
            //     .catch(() => {
            //         const toastEvent = new ShowToastEvent({
            //             title: 'Warning!',
            //             message: 'Can not delete!!',
            //             variant: 'warning'
            //         });
            //         this.dispatchEvent(toastEvent);
            //     })

        }
    }

}