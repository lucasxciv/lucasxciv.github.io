import styled from "styled-components"

export const SocialLinksWrapper = styled.div`
  align-items: center;
  display: flex;
  margin: auto;
`

export const SocialLinksList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0.5rem 0;
`

export const SocialLinksItem = styled.li`
  padding: 0 0.8rem;
`

export const SocialLinksLink = styled.a`
  color: var(--texts);
  text-decoration: none;
  transition: color 0.5s;
  &:hover {
    color: var(--highlight);
  }
`

export const IconWrapper = styled.div`
  fill: #bbb;
  width: 30px;
  height: 30px;
`
