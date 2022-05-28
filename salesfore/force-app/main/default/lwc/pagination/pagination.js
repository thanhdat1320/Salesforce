import { api, LightningElement, track } from 'lwc';


const defaultSize = 5;
export default class Pagination extends LightningElement {
    currentPage = 1;
    pageSizeOptions = [5, 10, 25, 50, 100];
    totalRecord;
    recordSize = defaultSize;
    totalPage = 0;

    @api
    set records(data) {
        this.rows = data;
        if (data) {
            this.totalRecord = data;
            this.totalPage = Math.ceil(data.length / this.recordSize)
            this.updateRecord();
        }
    }

    handlerFirst() {
        this.currentPage = 1;
        this.updateRecord()
    }

    handlerLast() {
        this.currentPage = this.totalPage;
        this.updateRecord()
    }
    
    get records() {
        return this.visibleRecord;
    }

    get disablePrevious() {
        return this.currentPage <= 1;
    }

    get disableNext() {
        return this.currentPage >= this.totalPage;
    }

    previousHandler() {
        if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.updateRecord();
        }
    }

    nextHandler() {
        if (this.currentPage < this.totalPage) {
            this.currentPage = this.currentPage + 1;
            this.updateRecord();
        }
    }

    updateRecord() {
        if (this.currentPage > this.totalPage || this.currentPage == 0) {
            this.currentPage = this.totalPage;
        }
        const start = (this.currentPage - 1) * this.recordSize;
        const end = this.recordSize * this.currentPage;
        this.visibleRecord = this.totalRecord.slice(start, end);
        this.dispatchEvent(new CustomEvent('update', {
            detail: {
                records: this.visibleRecord
            }
        }))
    }

    handleRecordsPerPage(event) {
        this.recordSize = event.target.value;
        this.currentPage = 1;
        this.totalPage = Math.ceil(this.totalRecord.length / this.recordSize)
        this.updateRecord();
    }
}