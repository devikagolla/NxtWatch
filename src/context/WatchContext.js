import React from 'react'

const WatchContext = React.createContext({
  isDarkTheme: false,
  activeTab: 'Home',
  savedVideos: [],
  changeTab: () => {},
  changeTheme: () => {},
  addVideo: () => {},
  removeVideos: () => {},
})

export default WatchContext
