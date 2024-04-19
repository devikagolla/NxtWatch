import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
`

export const Banner = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  display: ${props => props.display};
`

export const Para = styled.p`
  color: #231f20;
`
