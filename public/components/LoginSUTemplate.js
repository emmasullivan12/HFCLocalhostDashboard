import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";


// ModalContent provides all of the Content within Modal
const LoginSUContent = ({
  content,
}) => {
  return (
    <div>
      {content}
    </div>
  );
}

// Modal template which handles state i.e. whether is open / closed
class LoginSUTemplate extends React.Component {
  render() {
  const {children} = this.props;
    return (
      <React.Fragment>
        <LoginSUContent
          content={children}
        />
      </React.Fragment>
    );
  }
}

export default LoginSUTemplate;
