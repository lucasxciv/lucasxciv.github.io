import React, { useState, useEffect } from "react"

import links from "./content"
import getThemeColor from "../../utils/getThemeColor"
import { LightBulb as Light } from "styled-icons/octicons/LightBulb"

import * as S from "./styled"

const MenuLinks = () => {
  const [theme, setTheme] = useState(null)

  const isDarkMode = theme === "dark"

  useEffect(() => {
    setTheme(window.__theme)

    window.__onThemeChange = () => setTheme(window.__theme)
  }, [])

  return (
    <S.MenuLinks>
      <S.MenuLinksWrapper>
        {links.map((link, i) => (
          <S.MenuLinksItem key={i}>
            {!link.isExternalLink ? (
              <S.MenuLinksLink
                cover
                direction="left"
                bg={getThemeColor()}
                duration={0.6}
                to={link.url}
                activeClassName="active"
              >
                {link.label}
              </S.MenuLinksLink>
            ) : (
              <S.MenuLinksAnchor
                cover
                direction="left"
                bg={getThemeColor()}
                duration={0.6}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </S.MenuLinksAnchor>
            )}
          </S.MenuLinksItem>
        ))}
      </S.MenuLinksWrapper>
      <S.MenuBarItem
        title="Switch Theme"
        onClick={() => {
          window.__setPreferredTheme(isDarkMode ? "light" : "dark")

          if (window.DISQUS !== undefined) {
            window.setTimeout(() => {
              window.DISQUS.reset({
                reload: true,
              })
            }, 300)
          }
        }}
        className={theme}
      >
        <Light style={{ height: "1.5rem" }} />
      </S.MenuBarItem>
    </S.MenuLinks>
  )
}

export default MenuLinks
