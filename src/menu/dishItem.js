import "./dishItem.less";
import React from 'react';
import ModifierGroup from "./modifierGroup";
import {Collapse, Panel} from "react-bootstrap";

//import {observable} from "mobx"
import {observer, inject} from 'mobx-react';
//import autobind from 'autobind-decorator'

@observer
export default  class DishItem extends React.Component {

//@observable someAttribute = ..

    constructor(props) {
        super();
        this.state = {show:false};
    }
    showChildren(){
        this.setState(()=> {return {show : !this.state.show} });
    }


    render() {
        const {item} = this.props;
        const {show} = this.state;
        return (
            <div className="DishItem"  style={{hidden : window.deepSearch && window.foundItems.find(_item=> _item.id === item.id)}}>
                <Panel>
                    <Panel.Heading onClick={()=>this.showChildren()}>
                        <div className="ItemId">
                            {item.id}
                        </div>
                        <div className="ItemName">
                            {item.Name}
                        </div>
                        <div className="ItemPrice">
                            {item.Price}
                        </div>
                        <div className="ItemDescription">
                            {item.Description}
                        </div>
                    </Panel.Heading>
                    <Panel.Body>
                        <Collapse in={this.state.show}>
                        <div>
                        {item.ModifierGroups && item.ModifierGroups.map(modifierGroup=>
                            <div className="ModifierGroup" key={modifierGroup.id}>
                                <ModifierGroup modifier ={modifierGroup} />
                            </div>
                        ) }
                        </div>
                        </Collapse>
                    </Panel.Body>
                </Panel>

            </div>
        );
    }
}

