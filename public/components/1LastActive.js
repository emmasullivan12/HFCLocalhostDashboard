import React, { Component } from "react";

// FIRST STEP
// Upload latest folders of slack channelsl to "AVFXChannels" folder

// SECOND STEP
// Click "Grab last active dates", which pushes

class LastActive extends Component {
  constructor () {
    super();
    this.state = {

    }
    this.getLatestFile = this.getLatestFile.bind(this);
    this.pushToChatsFile = this.pushToChatsFile.bind(this);
  }

  getLatestFile(chatName) {
  //  const fs = require('fs')
//    const path = require('path')
//    const folderPath = `./AVFXChannels/${chatName}/`
  //  const folderPath = path.join('/', 'AVFXChannels', chatToRender, '/')

//    const chatFiles = fs.readdirSync(folderPath)
  //    .forEach((fileName) => {
        //bring back just the filename without file extension
  //      const chatFileWithHypens = path.basename(fileName, path.extname(fileName))

        //get rid of the hyphens in the file name & turn into number
  //      const chatFile = parseInt(chatFileWithHypens.replace(/-/g, ""))
  //    })

    //bring back the max number only
//    const maxChatFile = Math.max(...chatFiles)
//    this.pushToChatsFile(maxChatFile, chatName)
  }

  handleClick = (e) => {
    const {chatList} = this.props;
    // for each chat name, goes to folder and brings back list of file names and pushes to json file
    {chatList.map((chat, index) => {
      this.getLatestFile(chat.name)
    //  this.getLatestFile("juba-and-nana")
    })}
  }

  pushToChatsFile(maxChatFile, chatName) {
    //Dex to push to new array of chats with last active date
  }

  render() {

    return (
      <React.Fragment>
        <button type="button" onClick={this.handleClick}>
          Grab last active dates
        </button>
      </React.Fragment>
    )
  }
}

export default LastActive;
