import React, { Component } from 'react';
import TypeformFullSignUp from './TypeformFullSignUp';
import MentorMatches from './MentorMatches';

class MentorHomePage extends Component {
  render(){
    return (
      <div>
        <h1>This is where all the cool mentoring stuff happens ;)</h1>
        <MentorMatches />
        <TypeformFullSignUp />
      </div>
    );
  }
}

export default MentorHomePage;
