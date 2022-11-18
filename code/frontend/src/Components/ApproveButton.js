import * as React from "react";
import Button from "@mui/material/Button";



export default class AppButton extends React.Component { 
    constructor(props) {   // Approve button function
    super(props);
    this.state = { disable : false }
    this.state = { status : "Approve" }
    //this.state = { var1 : "Approve" }
    this.clickApprove = this.clickApprove.bind(this)
    this.clickDisapprove = this.clickDisapprove.bind(this)
    this.disable = this.disable.bind(this)
    this.doNothing = this.doNothing.bind(this)
    this.props.props ? this.disable() : this.doNothing()
    }

    disable() {
        this.setState({ disable : true})
        this.setState({ status : "Approved" })
    }

    doNothing() {
        console.log('test')
    }


    clickApprove() {
      this.setState({ disable : true })
      this.setState({ status :  "Approved"})
    }
    clickDisapprove() {
      this.setState({ disable : true })
      this.setState({ status :  "Disapproved"})

    }

    render() {
    return (
        <Button disabled={this.state.disable} onClick={this.clickApprove} variant='contained' color = 'primary'>{this.state.status}</Button>
        )
    } 
}