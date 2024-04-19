import {Link} from 'react-router-dom'

import WatchContext from '../../context/WatchContext'
import {ListItemPara} from './styledComponents'

const VideoCard = props => {
  const {videoData} = props
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    name,
    profileImageUrl,
  } = videoData

  return (
    <WatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

        return (
          <Link to={`/videos/${id}`}>
            <li key={id}>
              <img src={thumbnailUrl} alt="video thumbnail" />
              <div>
                <img src={profileImageUrl} alt="channel logo" />
              </div>
              <div>
                <ListItemPara color={textColor}>{title}</ListItemPara>
                <ListItemPara color={textColor}>{name}</ListItemPara>
                <ListItemPara color={textColor}>
                  {viewCount} views<span> &#8226; </span> {publishedAt}
                </ListItemPara>
              </div>
            </li>
          </Link>
        )
      }}
    </WatchContext.Consumer>
  )
}
export default VideoCard
