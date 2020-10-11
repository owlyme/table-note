import React from "react";
import ReactDOM from "react-dom";

export default class MountComponent {
  static containerElement = null;

  static _unmountComponentAtNode() {
    if (MountComponen.tcontainerElement) {
      // delete component Node
      ReactDOM.unmountComponentAtNode(MountComponent.containerElement);

      // remove DOM element
      MountComponent.containerElement.parentNode.removeChild(
        MountComponent.containerElement
      );
      MountComponent.containerElement = null;
    }
  }

  constructor(prop, className) {
    MountComponent.containerElement = null;
    this.reactComponent = prop || "div";
    this.containerClassName = className || "xalert-container";
  }

  createElement() {
    if (!MountComponent.containerElement) {
      MountComponent.containerElement = document.createElement("DIV");
      MountComponent.containerElement.className = this.containerClassName;
      document.body.appendChild(MountComponent.containerElement);
    }

    return this;
  }

  renderComponent(props) {
    let container = MountComponent.containerElement;
    let Component = this.reactComponent;

    ReactDOM.render(
      <Component
        onRemoveComponentAndElement={() => {
          this.removeContainerElement();
          this.unmountComponentAtNode();
        }}
        {...props}
      />,
      container
    );
  }

  removeContainerElement() {
    MountComponent.containerElement &&
      MountComponent.containerElement.parentNode.removeChild(
        MountComponent.containerElement
      );
    MountComponent.containerElement = null;
  }

  unmountComponentAtNode() {
    MountComponent.containerElement &&
      ReactDOM.unmountComponentAtNode(MountComponent.containerElement);
  }

  mounted(props) {
    this.createElement().renderComponent(props);
  }
}
