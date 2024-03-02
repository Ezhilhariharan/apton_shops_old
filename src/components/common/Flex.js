import styled, { css } from 'styled-components'

const defaultStyles = ({
  center,
  right,
  centerVertically,
  flexEnd,
  spaceBetween,
  spaceAround,
  spaceEvenly,
  section,
  column,
  cursor,
  wrap,
  alignCenter,
  end,
  flexStart,
}) =>
  css`
    display: flex;
    ${center && 'justify-content: center;'}
    ${right && 'justify-content: flex-end;'}
    ${spaceBetween && 'justify-content: space-between;'}
    ${spaceAround && 'justify-content: space-around;'}
    ${spaceEvenly && 'justify-content: space-evenly;'}
    ${flexEnd && 'justify-content: flex-end;'}
    ${centerVertically && 'align-items: center;'}
    ${section && 'margin-bottom: 20px;'}
    ${column && 'flex-direction: column;'}
    ${cursor && 'cursor: pointer;'}
    ${wrap && 'flex-wrap: wrap;'}
    ${alignCenter && 'align-items: center'}
    ${end && 'justify-content: end;'}
    ${flexStart && 'align-items: flex-start;'}
  `
const Flex = styled.div`
  ${defaultStyles}
  ${props => props.style}
`

export default Flex
