
import React from 'react';
import MainMenu from "./menu/mainMenu";
import MenuStore from "./menu/menuStore";
import ToastrContainer from 'react-toastr-basic'



export default class App extends React.Component {


    constructor(props) {
        super();
    }


    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const {t} = this.props;
        return (
            <div className="App">
                <ToastrContainer />
                    <MainMenu MenuStore={MenuStore}/>
            </div>
        );
    }
}
