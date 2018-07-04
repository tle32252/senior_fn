import React from 'react';
import {TextField} from "material-ui";

export default class PageTwo extends React.Component {
    render(){
        const {value, children}  = this.props // this.props.value
        return (
            <div>
                {value}, {children}
            </div>
        )
    }
}