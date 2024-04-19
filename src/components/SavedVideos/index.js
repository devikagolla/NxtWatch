import {MdPlaylistAdd} from 'react-icons/md'
import WatchContext from '../../context/WatchContext'
import Header from '../Header'

import NavigationTab from '../NavigationTab'

import VideoCard from '../VideoCard'
import {Container, SavedPara} from './styledComponents'

const SavedVideos = () => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideos} = value
      const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
      // const heading = isDarkTheme ? '#f1f5f9' : '#1e293b'
      const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

      return (
        <>
          <Header />
          <NavigationTab />
          <Container
            data-testid="savedVideos"
            bgColor={bgColor}
            textColor={textColor}
          >
            <div>
              <MdPlaylistAdd />
              <h1>Saved Videos</h1>
            </div>
            {savedVideos.length > 0 ? (
              <ul>
                {savedVideos.map(each => (
                  <VideoCard videoData={each} key={each.id} />
                ))}
              </ul>
            ) : (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                />
                <h1>No saved videos found</h1>
                <SavedPara>Save your videos by clicking a button</SavedPara>
              </div>
            )}
          </Container>
        </>
      )
    }}
  </WatchContext.Consumer>
)
export default SavedVideos
