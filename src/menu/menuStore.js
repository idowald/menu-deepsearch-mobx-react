import { observable } from 'mobx';
import {get} from 'ajax';
import {ToastSuccess, ToastDanger} from 'react-toastr-basic';


class MenuStore {

    @observable mainRefresh = false;
    @observable menu = [];
    @observable deepSearch = false;
    constructor(){
    }

    getMenuFromServer() {
        this.mainRefresh = true;
        get("https://mycheck-menus-dev.s3.amazonaws.com/9272/menu_general.json", null, (response)=>{
                this.menu = response;
                this.mainRefresh = false;
            },
            (error)=>{
                ToastDanger("Failed loading menu");
                console.error(error);
            });
    }


}

export default new MenuStore();
