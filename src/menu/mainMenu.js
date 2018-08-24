
import React from 'react';
import {observer} from 'mobx-react';
import autobind from 'autobind-decorator';


import { observable, computed } from 'mobx';
import {
    Button, PageHeader, Panel,
    FormGroup, ControlLabel, FormControl, HelpBlock
} from "react-bootstrap";
import Loading from 'react-loading-animation';
import ClassItem from "./classItem";
import DishItem from "./dishItem";
import ModifierGroup from "./modifierGroup";
import ModifierItem from "./modifierItem";


@observer
export default class MainMenu extends React.Component {

    @observable selectedMenu;
    @observable searchText = "";
    @observable shallowSearchActivated = false;
    @observable deepSearchActive = false;
    @observable foundItems = [];


    constructor(props) {
        super();
        this.n = 0;


    }



    componentWillMount(){
        this.props.MenuStore.getMenuFromServer();
    }
    menuSelected(eventKey, event){
        this.selectedMenu = eventKey;
    }
    //computed is mobx way of making things faster and optimized- it seems strange and not efficient- but it works ;)
    @computed get formValid(){
        if (this.searchText === ""){
            return null;
        }
        //simple example for validation - can change to regex
        if (this.searchText.length >10){
            return "error";
        }
        return "success";
    }

    @autobind
    changeText(e){
        this.searchText = e.target.value;
    }
    shallowSearch(){
        this.shallowSearchActivated  = !this.shallowSearchActivated;
    }
    mapMenu(menuItems){
        return <div>{menuItems.map(classObject=><ClassItem item={classObject} key={classObject.id}/>)}

            })</div>
    }
    deepSearch(){
        //I can't deep search on large trees, so i need to normalize the tree to an array
        if (this.formValid === "success"){
            this.deepSearchActive = true;
            this.foundItems = []; // i had problems with compiler for inject store (wrong boilerplate version) I had to use global vars right now
            this.needTosearch = [];
            for (let item of this.props.MenuStore.menu){
                this.needTosearch.push(item);
            }
            const searchProperties = ["ModifierGroups", "Classes", "Items", "Modifiers"];
            while(this.needTosearch.length){
                let item = this.needTosearch.pop();
                for (let search of searchProperties){
                    if (item.hasOwnProperty(search)){
                        for (let _item of item[search]){
                            this.needTosearch.push(_item);
                        }
                    }
                }
                 if (item.hasOwnProperty("Name") && item.Name.indexOf(this.searchText) > -1){
                    this.foundItems.push(item);
                }
            }
        }
    }

    render() {
        const {t} = this.props;
        const {menu} = this.props.MenuStore;

        return (
            <div className="bookTable">
                <PageHeader>
                    MyCheck Menu
                </PageHeader>
                <Panel>
                    <Panel.Body>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.formValid}
                        >
                            <ControlLabel>Filter results</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.searchText}
                                placeholder="Enter text"
                                onChange={this.changeText}
                            />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                        <Button onClick={()=>this.shallowSearch()}>{this.shallowSearchActivated? "Remove shallow search" : "Shallow Search"} </Button>
                        <Button onClick={()=>this.deepSearch()}>Deep search </Button>
                        {this.deepSearchActive && <Button onClick={()=>this.deepSearchActive = false}> Remove deepSearch</Button>}
                    </Panel.Body>
                    {this.deepSearchActive && this.foundItems.length &&
                    <Panel.Body>
                        {this.foundItems.map(_item=>{
                         switch (_item.type){
                             case "Classes":
                                 return <ClassItem item={_item}/>
                             case "Items":
                                 return <DishItem item={_item}/>
                             case "ModifierGroups":
                                 return <ModifierGroup modifier={_item}/>
                             case "Modifier":
                                 return <ModifierItem modifier={_item}/>
                         }
                        })}
                    </Panel.Body>}
                </Panel>
                {this.props.MenuStore.mainRefresh && <Loading/>}
                {this.shallowSearchActivated? this.mapMenu(menu.filter(classObject=>{
                    if (classObject.hasOwnProperty("Name") && classObject.Name.indexOf(this.searchText) > -1){
                        return true;
                    }
                    return false;

                })) : !this.deepSearchActive && this.mapMenu(menu)}
            </div>
        );
    }
}
