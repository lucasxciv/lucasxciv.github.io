import styled from "styled-components"
import media from "styled-media-query"
import AniLink from "gatsby-plugin-transition-link/AniLink"

export const PostItemLink = styled(AniLink)`
  color: var(--texts);
  display: flex;
  text-decoration: none;
  cursor: default;
  line-height: 1.2;

  &:first-child {
    margin-top: 20px;
  }

  &:last-child {
    margin-bottom: 20px;
  }

  body#grid & {
    background-color: var(--background);
  }
`

export const PostItemWrapper = styled.section`
  cursor: pointer;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: 0.1px 0.1px 5px var(--borders);
  transition: box-shadow 5s linear;
  display: flex;
  padding: 2rem 2rem;
  margin: 10px auto;
  width: 80%;

  body#grid & {
    border: none;
    padding: 2rem 1rem;
    flex-direction: column;
    justify-content: center;
  }

  ${media.lessThan("large")`
    align-items: flex-start;
    flex-direction: column;
    padding: 2rem 1rem;
    width: 95%;
  `}

  transition: color 0.25s;

  position: relative;
  vertical-align: middle;

  &::before,
  &::after {
    box-sizing: inherit;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &::before,
  &::after {
    border: 1px solid transparent;
    width: 0;
    height: 0;
  }

  &::before {
    top: 0;
    left: 0;
  }

  &::after {
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
  }

  &:hover {
    color: var(--highlight);
    box-shadow: 1px 1px 20px var(--borders);
  }

  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
  }

  &:hover::before {
    border-top-color: var(--highlight);
    border-right-color: var(--highlight);
    transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
  }

  &:hover::after {
    border-bottom-color: var(--highlight);
    border-left-color: var(--highlight);
    transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s,
      height 0.25s ease-out 0.75s;
    transition: height 0.25s ease-out, width 0.25s ease-out 0.25s;
  }
`

export const PostItemTag = styled.div`
  align-items: center;
  background: ${props =>
    props.background ? props.background : "var(--highlight)"};
  border-radius: 50%;
  color: var(--postColor);
  display: flex;
  font-size: 1.3rem;
  font-weight: 700;
  justify-content: center;
  min-height: 90px;
  min-width: 90px;
  text-transform: uppercase;

  ${media.lessThan("large")`
    border-radius: 0;
    font-size: 1rem;
    min-height: auto;
    min-width: auto;
    padding: .2rem .5rem;
    margin-bottom: .7rem;
  `}

  body#grid & {
    margin-bottom: 1.5rem;
  }
`

export const PostItemInfo = styled.div`
  display: flex;
  flex-direction: column;

  ${media.lessThan("large")`
    margin: 0;
  `}
`

export const PostItemDate = styled.time`
  font-size: 0.9rem;
`

export const PostItemTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0.2rem 0 0.5rem;

  body#grid & {
    line-height: 1.1;
    margin: 0.8rem 0;
  }
`

export const PostItemDescription = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.2;
`
