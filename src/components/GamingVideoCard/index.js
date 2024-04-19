import {Link} from 'react-router-dom'

import WatchContext from '../../context/WatchContext'

const GamingVideoCard = props => {
  const {videoData} = props
  const {id, title, thumbnailUrl, viewCount} = videoData

  return (
    <WatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

        return (
          <Link to={`/videos/${id}`}>
            <li key={id} color={textColor}>
              <img src={thumbnailUrl} alt="video thumbnail" />
              <div>
                <p>{title}</p>
                <p>{viewCount} Watching Worldwide</p>
              </div>
            </li>
          </Link>
        )
      }}
    </WatchContext.Consumer>
  )
}
export default GamingVideoCard
