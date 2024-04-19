import WatchContext from '../../context/WatchContext'

import HomeVideoCard from '../HomeVideoCard'

import {Heading} from './styledComponents'

const HomeVideos = props => {
  const {homeVideos, onRetry} = props

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <WatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const heading = isDarkTheme ? '#f1f5f9' : '#1e293b'

        return homeVideos.length > 0 ? (
          <ul>
            {homeVideos.map(each => (
              <HomeVideoCard videoData={each} key={each.id} />
            ))}
          </ul>
        ) : (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <Heading heading={heading}>No Search results found</Heading>
            <p>Try different key words or remove search filter</p>
            <button type="button" onClick={onClickRetry}>
              Retry
            </button>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )
}
export default HomeVideos
