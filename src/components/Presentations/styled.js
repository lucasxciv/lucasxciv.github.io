import styled from "styled-components"
import media from "styled-media-query"

export const Link = styled.a`
  text-decoration: none;
`

export const Item = styled.div`
  cursor: pointer;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: 0.1px 0.1px 5px var(--borders);
  transition: box-shadow 5s linear;
  padding: 1rem 2rem;
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
    padding: 1rem 1rem;
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

export const Title = styled.div`
  color: var(--texts);
  margin: 0 auto 0 auto;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.5;
`

export const Date = styled.div`
  color: var(--texts);
  margin: 0 auto 0 auto;
  font-size: 1rem;
  font-weight: 100;
  line-height: 1;
`

export const ListWrapper = styled.section``
