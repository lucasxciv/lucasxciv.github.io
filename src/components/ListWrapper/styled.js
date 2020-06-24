import styled from "styled-components"
import media from "styled-media-query"

export const Title = styled.div`
  color: var(--texts);
  width: 80%;
  margin: 25px auto 0 auto;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.5;

  ${media.lessThan("large")`
    width: 95%;
  `}
`

export const ListWrapper = styled.section`
  body#grid & {
    background-color: var(--borders);
    border-bottom: 1px solid var(--borders);
    display: grid;
    grid-area: posts;
    grid-gap: 1px;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  }
`
