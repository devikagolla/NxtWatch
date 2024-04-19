import WatchContext from '../../context/WatchContext'

import {Container, RetryButton} from './styledComponents'

const FailureView = props => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const bgColor = isDarkTheme ? '#231f20' : '#f1f5f9'
      const image = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

      const {onRetry} = props
      const onClickRetry = () => {
        onRetry()
      }

      return (
        <Container bgColor={bgColor} textColor={textColor}>
          <img src={image} alt="failure view" />
          <h1>Oops! Something Went Wrong</h1>
          <p>
            We are having some trouble to complete your request. <br />
            Please try again.
          </p>
          <RetryButton type="button" onClick={onClickRetry}>
            Retry
          </RetryButton>
        </Container>
      )
    }}
  </WatchContext.Consumer>
)

export default FailureView
