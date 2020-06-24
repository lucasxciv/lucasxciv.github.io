import styled from "styled-components"
import media from "styled-media-query"
import AniLink from "gatsby-plugin-transition-link/AniLink"

export const MenuLinks = styled.div`
  height: 100%;
  margin-top: 0.8rem;
  text-align: right;
  display: flex;
`

export const MenuLinksWrapper = styled.nav`
  height: 100%;
  margin-top: 0.4rem;
  text-align: right;
  ${media.lessThan("large")`
    display: none;
  `}
`

export const MenuLinksList = styled.div`
  font-size: 1.2rem;
  font-weight: 300;
  display: block;
`

export const MenuLinksItem = styled.span`
  padding: 0 0.5rem;
  position: relative;

  .active {
    color: var(--highlight);
  }
`

export const MenuLinksLink = styled(AniLink)`
  color: var(--texts);
  text-decoration: none;
  transition: color 0.5s;

  &:hover {
    color: var(--highlight);
  }
`

export const MenuLinksAnchor = styled.a`
  color: var(--texts);
  text-decoration: none;
  transition: color 0.5s;

  &:hover {
    color: var(--highlight);
  }
`

export const MenuBarItem = styled.span`
  color: var(--texts);
  cursor: pointer;
  display: inline;
  padding: 0 1.1rem;

  &.light {
    color: #d4d400;

    &:hover {
      color: #e2e240;
    }
  }

  &:hover {
    color: var(--postColor) #fff;
  }

  &.display {
    ${media.lessThan("large")`
      display: none;
    `}
  }

  ${media.greaterThan("large")`
    &:hover {
      color: var(--highlight);
    }
  `}

  ${media.lessThan("large")`
    height: 2.2rem;
    position: relative;
    width: 3.2rem;
  `}
`
