import "./dishItem.less";
import React from 'react';
import ModifierGroup from "./modifierGroup";
import {Collapse, Panel} from "react-bootstrap";



export default  class DishItem extends React.Component {


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
            <div className="DishItem">
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

