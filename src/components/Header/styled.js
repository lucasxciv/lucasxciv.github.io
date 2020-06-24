import styled from "styled-components"

export const Header = styled.aside`
  border-right: 1px solid var(--borders);
  background: var(--mediumBackground);
  display: block;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
`

export const HeaderWrapper = styled.div`
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  max-width: 1100px;
  margin: auto;
`
