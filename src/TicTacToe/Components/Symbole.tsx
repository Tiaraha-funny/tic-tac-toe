import styled from 'styled-components'
import circle from '../images/circle.svg'
import cross from '../images/cross.svg'

export function SymbolesX() {
  return <Image src={cross} alt='player x' />
}

export function SymbolesO() {
  return <Image src={circle} alt='player O' />
}

const Image = styled.img`
  max-width: 50px;
`
