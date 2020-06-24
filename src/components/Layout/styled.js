import styled from "styled-components"
import media from "styled-media-query"

export const LayoutWrapper = styled.section`
  display: flex;
  background: var(--background);

  ${media.lessThan("large")`
    flex-direction: "column";
  `}
`

export const LayoutMain = styled.main`
  background: var(--background);
  min-height: 100vh;
  padding: 3.75rem 3.75rem 3.75rem 3.75rem;
  max-width: 65rem;
  width: 100%;
  margin: auto;

  body#grid & {
    grid-template-areas:
      "posts"
      "pagination";
  }

  ${media.lessThan("large")`
    padding: 4.125rem 0 3rem 0;
  `}
`
