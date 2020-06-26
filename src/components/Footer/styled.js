import styled from "styled-components"
import media from "styled-media-query"

export const PaginationWrapper = styled.section`
  margin: 50px auto auto auto;
  text-align: center;
  border-top: 1px solid var(--borders);
  color: var(--texts);
  padding: 1.5rem 3rem 0.1rem 3rem;

  ${media.lessThan("large")`
    font-size: .8rem;
    padding: 1rem;
  `}
`
