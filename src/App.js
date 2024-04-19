import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import SavedVideos from './components/SavedVideos'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import WatchContext from './context/WatchContext'

import './App.css'

class App extends Component {
  state = {isDarkTheme: false, activeTab: 'Home', savedVideos: []}

  changeTheme = () => {
    this.setState(prev => ({isDarkTheme: !prev.isDarkTheme}))
  }

  changeTab = value => {
    this.setState({activeTab: value})
  }

  addVideo = video => {
    const {savedVideos} = this.state
    const item = savedVideos.find(each => each.id === video.id)
    if (item) {
      this.setState({savedVideos})
    } else {
      this.setState(prev => ({savedVideos: [...prev.savedVideos, video]}))
    }
  }

  removeVideos = id => {
    const {savedVideos} = this.state
    const item = savedVideos.filter(each => each.id !== id)
    this.setState({savedVideos: item})
  }

  render() {
    const {isDarkTheme, activeTab, savedVideos} = this.state
    return (
      <WatchContext.Provider
        value={{
          isDarkTheme,
          activeTab,
          savedVideos,
          changeTab: this.changeTab,
          changeTheme: this.changeTheme,
          addVideo: this.addVideo,
          removeVideos: this.removeVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </WatchContext.Provider>
    )
  }
}

export default App
