import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'

import WatchContext from '../../context/WatchContext'

import {LikeButton, Span} from './styledComponents'

const VideoItemCard = props => {
  const {videoData, isClickDisliked, isClickLiked, isLiked, isDisliked} = props
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    profileImageUrl,
    name,
    subscriberCount,
    description,
  } = videoData

  const onClicklike = () => {
    isClickLiked()
  }

  const onClickDislike = () => {
    isClickDisliked()
  }

  return (
    <WatchContext.Consumer>
      {value => {
        const {addVideo, savedVideos, removeVideos} = value
        const liked = isLiked ? '#2563eb' : '#64748b'
        const disliked = isDisliked ? '#2563eb' : '#64748b'
        let isSaved
        const index = savedVideos.findIndex(each => each.id === id)
        if (index === -1) {
          isSaved = false
        } else {
          isSaved = true
        }

        const addOrRemove = () => {
          if (isSaved) {
            removeVideos(id)
          } else {
            addVideo(videoData)
          }
        }

        const onClickSave = () => {
          addOrRemove()
        }

        return (
          <>
            <ReactPlayer url={thumbnailUrl} controls width="100%" />
            <p>{title}</p>
            <div>
              <p>
                {viewCount} views<span> &#8226; </span> {publishedAt}
              </p>
              <div>
                <LikeButton type="button" onClick={onClicklike} color={liked}>
                  <AiOutlineLike size={25} />
                  <Span>Like</Span>
                </LikeButton>
                <LikeButton
                  type="button"
                  onClick={onClickDislike}
                  color={disliked}
                >
                  <AiOutlineDislike size={25} />
                  <Span>Dislike</Span>
                </LikeButton>
                <button type="button" onClick={onClickSave}>
                  <MdPlaylistAdd size={25} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>
            <hr />
            <div>
              <img src={profileImageUrl} alt="channel logo" />
              <div>
                <p>{name}</p>
                <p>{subscriberCount}</p>
                <p>{description}</p>
              </div>
            </div>
          </>
        )
      }}
    </WatchContext.Consumer>
  )
}
export default VideoItemCard
