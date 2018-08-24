
import React from 'react';
import ModifierItem from "./modifierItem";


export default class ModifierGroup extends React.Component {


    constructor(props) {
        super();
    }



    render() {
        const {modifier} = this.props;
        return (
            <div className="ModifierGroup"  style={{hidden : window.deepSearch && window.foundItems.find(_item=> _item.id === modifier.id)}}>
                <div className="ModifierId">
                    {modifier.id}
                </div>
                <div className="ModifierName">
                    {modifier.Name}
                </div>
                <div className="ModifierPrice">
                    {modifier.Price}
                </div>
                <div className="ModifierDescription">
                    {modifier.Description}
                </div>
                {modifier.Modifiers && modifier.Modifiers.map(modifier=>
                <ModifierItem key={modifier.id} modifier={modifier}/>)}
            </div>
        );
    }
}
