import React from "react";
import ReactDOM from "react-dom";
// import mountComponent from "html-insert-react";
// const defaultC = () => <span>尚未配置 component</span>;
// export default mountComponent(React, ReactDOM, defaultC);

const defaultC = () => <span>尚未配置 component</span>;
export default class MountComponent {
  constructor({
    component,
    conatinerTag,
    containerClassName,
    replace = false,
    targetId,
    targetDomNode,
  }) {
    this.containerElement = null;

    this.reactComponent = component || defaultC;

    this.replace = replace;
    this.targetId = targetId;
    this.targetDomNode = targetDomNode;
    this.conatinerTag = conatinerTag;
    this.containerClassName = containerClassName || "xalert-container";
  }

  sleep() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  }
  // 获取父节点
  async getContanierNode() {
    let Cnode = null;

    if (this.targetDomNode) {
      Cnode = this.targetDomNode;
    } else if (this.targetId) {
      Cnode = document.querySelector(this.targetId);
    } else {
      Cnode = document.body;
    }
    if (!Cnode) {
      await this.sleep();
      Cnode = this.getContanierNode();
    }
    return Cnode;
  }
  // 将组件插入DOM
  async insertDom() {
    let inistance = this.instance;
    await this.getContanierNode().appendChild(inistance.$el);
    return this;
  }
  // 替换子节点点
  async replaceDom() {
    let Cnode = await this.getContanierNode();

    if (this.targetDomNode || this.targetId) {
      [...Cnode.childNodes].forEach((childNode) => {
        Cnode.removeChild(childNode);
      });
    }
    this.containerElement = null;
    return this;
  }

  async createElement() {
    let Cnode = await this.getContanierNode();
    let conatinerTag = this.conatinerTag;
    let containerClassName = this.containerClassName;

    if (!this.containerElement) {
      this.containerElement = document.createElement(
        conatinerTag ? conatinerTag.toUpperCase() : "DIV"
      );
      this.containerElement.className = containerClassName;
      await Cnode.appendChild(this.containerElement);
    }

    return this;
  }

  renderComponent(props) {
    let container = this.containerElement;
    let Component = this.reactComponent;

    ReactDOM.render(
      <Component
        destory={() => {
          this.destory();
        }}
        {...props}
      />,
      container
    );
  }

  removeContainerElement() {
    let containerEle = this.containerElement;

    containerEle && containerEle.parentNode.removeChild(containerEle);
    this.containerElement = null;
  }

  unmountComponentAtNode() {
    let containerEle = this.containerElement;
    containerEle && ReactDOM.unmountComponentAtNode(containerEle);
  }

  destory() {
    this.removeContainerElement();
    this.unmountComponentAtNode();
  }

  async mounted(props) {
    if (this.replace) {
      await this.replaceDom();
    }
    await this.createElement();

    this.renderComponent(props);
  }
}
