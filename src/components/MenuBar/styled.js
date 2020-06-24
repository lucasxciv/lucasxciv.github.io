import styled from "styled-components"
import media from "styled-media-query"
import AniLink from "gatsby-plugin-transition-link/AniLink"

export const MenuBarWrapper = styled.aside`
  align-items: center;
  background: var(--mediumBackground);
  border-top: 1px solid var(--borders);
  bottom: 0;
  width: 100%;
  transition: background 0.5s;
  position: fixed;
  display: none;

  ${media.lessThan("large")`
    border-top: 1px solid var(--borders);
    bottom: 0;
    flex-direction: row;
    height: auto;
    padding: 0;
    position: fixed;
    width: 100%;
    display: inline;
  `}
`

export const MenuBarBottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1000px;
  margin: auto;
  height: auto;
  padding: 0;
`

export const MenuBarGroup = styled.div`
  display: flex;
  flex-direction: row;

  ${media.lessThan("large")`
    flex-direction: row;
  `}
`

export const MenuBarLink = styled(AniLink)`
  display: block;
`

export const MenuBarItem = styled.span`
  color: var(--texts);
  cursor: pointer;
  display: block;
  height: 2.5rem;
  padding: 0.5rem 1.1rem;
  position: relative;
  width: 3.5rem;

  &.light {
    color: #d4d400;

    &:hover {
      color: #e2e240;
    }
  }

  &:hover {
    color: var(--postColor) fff;
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
    height: 3.2rem;
    padding: .9rem;
    position: relative;
    width: 3.2rem;
  `}
`
