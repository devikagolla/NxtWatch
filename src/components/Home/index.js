import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'

import WatchContext from '../../context/WatchContext'

import Header from '../Header'
import NavigationTab from '../NavigationTab'
import FailureView from '../FailureView'

import HomeVideos from '../HomeVideos'

import {Container, Banner, Para} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    homeVideos: [],
    apiStatus: apiStatusConstants.initial,
    banner: 'flex',
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        homeVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onRetry = () => {
    this.setState({searchInput: ''}, this.getHomeVideos)
  }

  onClickClose = () => {
    this.setState({banner: 'none'}, this.getHomeVideos)
  }

  onClickSearch = () => {
    this.getHomeVideos()
  }

  renderVideosList = () => {
    const {homeVideos} = this.state
    return <HomeVideos homeVideos={homeVideos} onRetry={this.onRetry} />
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderHomeVideos() {
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
    const {searchInput, banner} = this.state
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'
          const display = banner === 'flex' ? 'flex' : 'none'
          const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'
          const image = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <>
              <Header />
              <NavigationTab />
              <Container
                data-testid="home"
                bgColor={bgColor}
                textColor={textColor}
              >
                {/* eslint-disable-next-line */}
                <Banner data-testid="banner" display={display}>
                  <div>
                    <img src={image} alt="nxt watch logo" />
                    <Para>Buy Nxt Watch Premium prepaid plans with UPI</Para>
                    <button type="button">GET IT NOW</button>
                  </div>
                  <div>
                    {/* eslint-disable-next-line */}
                    <button data-testid="close" onClick={this.onClickClose}>
                      <AiOutlineClose />
                    </button>
                  </div>
                </Banner>
                <div>
                  <input
                    type="search"
                    value={searchInput}
                    onChange={this.onChangeInput}
                    placeholder="Search"
                  />
                  {/* eslint-disable-next-line */}
                  <button
                    type="button"
                    data-testid="searchButton"
                    onClick={this.onClickSearch}
                  >
                    <AiOutlineSearch />
                  </button>
                </div>
                {this.renderHomeVideos()}
              </Container>
            </>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}
export default Home
