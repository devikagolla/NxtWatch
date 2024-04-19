import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
`

export const RetryButton = styled.button`
  padding: 10px;
  margin-right: 20px;
  font-size: 15px;
  color: ${props => props.color};
  border-radius: 4px;
  border: 2px solid #0070c1;
  background-color: #4f46e5;
`
