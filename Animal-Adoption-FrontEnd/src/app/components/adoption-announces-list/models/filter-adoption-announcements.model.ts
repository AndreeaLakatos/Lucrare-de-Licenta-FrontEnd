export class FilterAdoptionAnnouncement {
    constructor(text: string, menuItems: MenuItem[], name: string) {
        this.text = text;
        this.menuItems = menuItems;
        this.name = name;
    }
    text: string;
    menuItems: MenuItem[];
    name: string;
}

export class MenuItem {
    constructor(text: string, checked: boolean, value: string) {
        this.text = text;
        this.checked = checked;
        this.value = value;
    }
    text: string;
    checked: boolean;
    value: string;
}