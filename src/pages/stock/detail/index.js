import React, { Component } from "react";

class GoodsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let history = this.props.history
    console.log(this.props)
    return (
      <div>
         <div onClick={() => {
        history.goBack()
      }}>back</div>
        GoodsDetail
      </div>
    )
  }
}

export default GoodsDetail;


