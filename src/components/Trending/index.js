import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import WatchContext from '../../context/WatchContext'
import Header from '../Header'

import NavigationTab from '../NavigationTab'

import VideoCard from '../VideoCard'
import FailureView from '../FailureView'
import {Container} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    trendVideos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendVideos()
  }

  getTrendVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        name: video.channel.name,
        profileImageUrl: video.channel.profile_image_url,
        viewCount: video.view_count,
        publishedAt: video.published_at,
      }))
      this.setState({
        trendVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetry = () => {
    this.getTrendVideos()
  }

  renderVideosList = () => {
    const {trendVideos} = this.state
    return (
      <div>
        <ul className="products-list">
          {trendVideos.map(video => (
            <VideoCard videoData={video} key={video.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderTrendVideos() {
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
                data-testid="trending"
                bgColor={bgColor}
                textColor={textColor}
              >
                <div>
                  <HiFire />
                  <h1>Trending</h1>
                </div>
                {this.renderTrendVideos()}
              </Container>
            </>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}
export default Trending
