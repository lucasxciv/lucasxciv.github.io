import styled from "styled-components"
import media from "styled-media-query"

export const AboutWrapper = styled.div`
  color: var(--texts);
  width: 80%;
  margin: 25px auto;
  font-size: 1.3rem;
  line-height: 1.5;

  ${media.lessThan("large")`
    width: 95%;
  `}

  b {
    font-weight: bold;
  }

  a {
    border-bottom: 1px dashed var(--highlight);
    color: var(--highlight);
    text-decoration: none;
    transition: opacity 0.5s;
    svg {
      color: var(--postColor);
    }
    &:hover {
      opacity: 0.8;
    }
  }
`
