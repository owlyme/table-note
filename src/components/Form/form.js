import React, { Component } from "react";

class RefsForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    //  从 form 中取出节点列表
    //  它是一个类数组，没有数组的方法
    // const { pet, fruit, petbox, text, select } = this.form;

    // // radio 标签集合有 value 属性
    // // 查看打印出来的数据
    // console.log(select, select.value);
    // console.log(pet, pet.value);
    // console.log(fruit, fruit.value);
    // console.log(
    //   petbox,
    //   [...petbox].filter(i => i.checked).map(i => i.value)
    // );

    this.props.onSubmit(this.form);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} ref={(form) => (this.form = form)}>
        {this.props.children}
      </form>
    );
  }
}

export default RefsForm;
