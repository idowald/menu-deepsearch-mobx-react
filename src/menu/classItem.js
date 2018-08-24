import "./classItem.less";
import React from 'react';
import DishItem from "./dishItem";
import {Collapse, Panel} from "react-bootstrap";

export default class ClassItem extends React.Component {

//@observable someAttribute = ..

    constructor(props) {
        super();
        this.state = {show: false};
    }


    render() {
        const {item} = this.props;
        return (
            <div className="ClassItem"  style={{hidden : window.deepSearch && window.foundItems.find(_item=> _item.id === item.id)}}>
                <Panel bsStyle="primary">
                    <Panel.Heading onClick={()=>this.setState({show: !this.state.show})}>
                        <div className="ClassItemName">
                            {item.Name}
                        </div>
                        <div className="ClassItemDescription">
                            {item.Description}
                        </div>
                        <div className="ClassItemPrice">
                            {item.Price}
                        </div>
                    </Panel.Heading>
                    <Panel.Body>
                        <Collapse in={this.state.show}>
                            <div>
                                <div className="childrenClasses">
                                    {
                                        item.Classes && item.Classes.map(classObject=><ClassItem item={classObject} key={classObject.id}/>)
                                    }
                                </div>
                                <div className="childrenDishItems">
                                    {item.Items && item.Items.map(dishItem=><DishItem key={dishItem.id} item={dishItem}/>)}
                                </div>
                            </div>
                        </Collapse>
                    </Panel.Body>
                </Panel>

            </div>
        );
    }
}

