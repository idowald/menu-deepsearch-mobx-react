import './modifierItem.less';

import React from 'react';

export default class ModifierItem extends React.Component {

//@observable someAttribute = ..

    constructor(props) {
        super();
    }


    render() {
        const {modifier} = this.props;
        return (
            <div className="ModifierItem" id={"modifierId_" + modifier.id }
                 style={{hidden : window.deepSearch && window.searchText.indexOf(_item=> _item.id === modifier.id)}}>
                {modifier.id}
                <br/>
                {modifier.Name}
                <br/>
                {modifier.Description}
            </div>
        );
    }
}

