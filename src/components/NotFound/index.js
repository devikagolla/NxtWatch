import WatchContext from '../../context/WatchContext'

import {Container} from './styledComponents'

const NotFound = () => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const bgColor = isDarkTheme ? '#231f20' : '#f1f5f9'
      const image = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <Container bgColor={bgColor}>
          <img src={image} alt="not found" className="not-found-img" />
          <h1>Page Not Found</h1>
          <p>we are sorry, the page you requested could not be found.</p>
        </Container>
      )
    }}
  </WatchContext.Consumer>
)

export default NotFound
