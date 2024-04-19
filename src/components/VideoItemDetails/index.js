import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import WatchContext from '../../context/WatchContext'
import Header from '../Header'

import NavigationTab from '../NavigationTab'

import VideoItemCard from '../VideoItemCard'
import FailureView from '../FailureView'
import {Container} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videos: [],
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.video_details.id,
        title: fetchedData.video_details.title,
        thumbnailUrl: fetchedData.video_details.thumbnail_url,
        name: fetchedData.video_details.channel.name,
        profileImageUrl: fetchedData.video_details.channel.profile_image_url,
        subscriberCount: fetchedData.video_details.channel.subscriber_count,
        viewCount: fetchedData.video_details.view_count,
        publishedAt: fetchedData.video_details.published_at,
        description: fetchedData.video_details.description,
      }
      this.setState({
        videos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetry = () => {
    this.getVideos()
  }

  isClickLiked = () => {
    this.setState(prev => ({isLiked: !prev.isLiked, isDisliked: false}))
  }

  isClickDisliked = () => {
    this.setState(prev => ({isDisliked: !prev.isDisliked, isLiked: false}))
  }

  renderVideosList = () => {
    const {videos, isDisliked, isLiked} = this.state
    return (
      <div>
        <VideoItemCard
          videoData={videos}
          key={videos.id}
          isClickLiked={this.isClickLiked}
          isClickDisliked={this.isClickDisliked}
          isLiked={isLiked}
          isDisliked={isDisliked}
        />
      </div>
    )
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVideos() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
          const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

          return (
            <>
              <Header />
              <NavigationTab />
              <Container
                textColor={textColor}
                bgColor={bgColor}
                data-testid="videoItemDetails"
              >
                {this.renderVideos()}
              </Container>
            </>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}
export default VideoItemDetails
