import styled from "styled-components"
import media from "styled-media-query"
import AniLink from "gatsby-plugin-transition-link/AniLink"

export const ProfilerWrapper = styled.div`
  color: var(--texts);
  align-items: center;
  display: flex;
`
export const ProfileLink = styled(AniLink)`
  color: var(--texts);
  text-decoration: none;
  transition: color 0.5s;

  display: flex;
  text-align: left;

  ${media.lessThan("large")`
    display: flex;
    text-align: left;
  `}

  &:hover {
    color: var(--highlight);
  }
`

export const ProfileAuthor = styled.h1`
  font-size: 1.3rem;
  margin: 4px 0 0 10px;

  ${media.lessThan("large")`
    font-size: 1.1rem;
    margin: 0 0 0 10px;
  `}
`

export const ProfilePosition = styled.small`
  display: block;

  font-size: 0.9rem;
  margin-top: 0.2rem;

  ${media.lessThan("large")`
    font-size: 0.8rem;
    margin-top: 0.2rem;
  `}
`

export const ProfileDescription = styled.p`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.4;
  display: none;

  ${media.lessThan("large")`
    display: none;
  `}
`
