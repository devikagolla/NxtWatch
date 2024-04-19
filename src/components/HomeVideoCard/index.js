import {Link} from 'react-router-dom'

import WatchContext from '../../context/WatchContext'

import {Para} from './styledComponents'

const HomeVideoCard = props => {
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
            <li>
              <img src={thumbnailUrl} alt="video thumbnail" />
              <div>
                <img src={profileImageUrl} alt="channel logo" />
                <Para textColor={textColor}>{title}</Para>
              </div>
              <Para textColor={textColor}>{name}</Para>
              <div>
                <Para textColor={textColor}>
                  {viewCount} views<span> &#8226; </span> {publishedAt}
                </Para>
              </div>
            </li>
          </Link>
        )
      }}
    </WatchContext.Consumer>
  )
}
export default HomeVideoCard
