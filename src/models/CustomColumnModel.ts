export default class CustomColumnModel {
    key: string;
    label: string;
    type: string;
    edit: boolean;

    constructor() {
        this.key = 'customField~1';
        this.label = 'Deliv ';
        this.type = 'custom';
        this.edit = false;
    }
}