// vendors
import React, { useState } from "react"
import PropTypes from "prop-types"
import { Global, css } from "@emotion/react"

// styles
import "normalize.css"
import globalStyle from "../../styles/global"
import { transition } from "../../styles/variables"
import themes from "../../styles/themes"
import SiteHeader from "../SiteHeader"
import SiteFooter from "../SiteFooter/SiteFooter"
import Dialog from "../Dialog"
import NewsletterForm from "../../views/NewsletterForm"

const Layout = ({ children, themeColor }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Global styles={globalStyle} />
      <Global
        styles={css`
          html {
            background-color: ${themes[themeColor].backgroundColor};
            transition: background-color ${transition.speed.default}
              ${transition.curve.default};
          }

          body {
            color: ${themes[themeColor].color};
          }
        `}
      />
      <SiteHeader themeColor={themeColor} onNewsletterOpen={setIsOpen} />

      <main>{children}</main>

      <SiteFooter themeColor={themeColor} onNewsletterOpen={setIsOpen} />

      <Dialog isOpen={isOpen} onClose={setIsOpen} themeColor={themeColor}>
        <NewsletterForm themeColor={themeColor} />
      </Dialog>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  themeColor: PropTypes.string,
}

Layout.defaultProps = {
  themeColor: "DARK",
}

export default Layout
