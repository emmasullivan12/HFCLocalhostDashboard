import React, { Component } from "react";
import PrMessage from "./PrMessage";

const PrMessagesList = ({ messages }) => (
  <div>
    <ul>
    {messages.map(message => (
      <PrMessage
        key={message.id}
        message={message}
      />
    ))}
    </ul>
  </div>
)


export default PrMessagesList;
