import styled from 'styled-components'
import { fonts } from './fonts'

export const ButtonContainer = styled.div`
  span {
    margin-top: 100px;
    font-size: 38px;
    line-height: 48px;
    color: #000000;
  }

  h3 {
    font-size: 48px;
    line-height: 48px;
  }
`

export const Lists = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 20px);
  grid-gap: 100px;
  margin-top: 78px;
  margin-bottom: 70px;

  div > button {
    width: 118px;
    height: 65px;
    margin-bottom: 19px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
  }

  div:nth-of-type(1),
  div:nth-of-type(2) {
    border-right: solid 3px #545050;
    width: fit-content;
  }

  div > button:nth-of-type(1),
  div > button:nth-of-type(2) {
    border-bottom: solid 3px #545050;
  }
`

export const Container = styled.section`
  ${fonts}
  max-width: fit-content;
  margin: auto;
  line-height: 72px;
  text-align: center;

  img {
    width: 100%;
  }
`
export const Header = styled.header``
export const Title = styled.h1`
  ${fonts}
  font-size: 62px;
`

export const Input = styled.input`
  width: 100%;
  font-size: 20px;
  line-height: 48px;
  border: none;
  outline: none;
  ::placeholder {
    font-style: normal;
    font-weight: normal;
    color: #8b8585;
  }
`
export const Button = styled.button`
  font-size: 42px;
  line-height: 72px;
  text-align: center;
  cursor: pointer;
  color: #000000;
  border: none;
  outline: none;
  background-color: transparent;
`

export const Wrapper = styled.label`
  align-items: center;
  display: flex;
  gap: 20px;
  line-height: 50px;
  margin-bottom: 50px;
`
export const Image = styled.img`
  max-width: 55px;
`

export const TitleTimer = styled.span`
  font-size: 48px;
  line-height: 48px;
  color: #000000;
`
export const InputTime = styled.input`
  :-webkit-inner-spin-button {
    appearance: auto;
    display: none;
  }
  font-size: 30px;
  line-height: 48px;
  border: none;
  outline: none;
  max-width: 55px;
`

export const Draw = styled.button`
  display: flex;
  align-items: center;
`
