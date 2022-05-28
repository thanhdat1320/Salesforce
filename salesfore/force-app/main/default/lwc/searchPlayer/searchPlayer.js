import { api, LightningElement, track, wire } from 'lwc';
import getPlayers from '@salesforce/apex/PlayerController.getPlayers';


export default class SearchPlayer extends LightningElement {
    keySearch;
    listPlayer;

    updateKey(event) {
        this.keySearch = event.target.value;
    }

    @wire(getPlayers, { searchKey: '$keySearch' })
    wirePlayer({ data }) {
        this.listPlayer = data;
        const searchEvent = new CustomEvent("getsearchvalue", {
            detail: this.listPlayer
        })
        this.dispatchEvent(searchEvent);
    }
}