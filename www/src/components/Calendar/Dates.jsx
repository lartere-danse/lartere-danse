// vendors
/** @jsx jsx */
import { jsx } from "@emotion/react"
import React from "react"
import { css } from "@emotion/react"
import { colors } from "../../styles/variables"
import { keyframes } from "@emotion/react"
import useMedia from "../../hooks/useMedia"
import { Link } from "gatsby"

const getColorForAudience = (audience) => {
  switch (audience) {
    case "professionnel":
      return colors.PortlandOrange
    case "artist":
      return colors.PaleCerulean
    case "generalPublic":
      return colors.canary
    default:
      return "#fff"
  }
}

const Event = ({ event }) => {
  const delta = 100 / (event.targetAudience.length + 1)

  const animateLink = keyframes`
    ${event.targetAudience.map(
      (audience, index) => css`
        ${delta * index}% {
          color: ${getColorForAudience(audience)};
        }

        ${index === 0 &&
        css`
          100% {
            color: ${getColorForAudience(audience)};
          }
        `}
      `
    )}
  `

  return (
    <li
      css={css`
        margin-top: 0.5em;
      `}
    >
      <Link
        css={css`
          text-decoration: none;
          animation: ${animateLink} ${delta * 0.25}s infinite;

          :hover {
            animation: none;
            color: ${colors.pink};
          }
        `}
        to={event.link}
      >
        {event.title}
      </Link>
    </li>
  )
}

const Dates = ({ month, year, events = [] }) => {
  const isMobile = useMedia("(max-width: 1024px)")

  const daysInMonth = new Date(year, month + 1, 0, 0, 0, 0).getUTCDate()
  const firstDayInMonthPosition = new Date(year, month, 1, 0, 0, 0).getUTCDay()

  return (
    <>
      {Array(daysInMonth)
        .fill()
        .map((val, index) => {
          const todayEvents = events.filter((event) => {
            const today = new Date(year, month, index + 1, 0, 0, 0)

            return (
              today.getUTCDate() === event.date.getUTCDate() &&
              today.getUTCMonth() === event.date.getUTCMonth() &&
              today.getUTCFullYear() === event.date.getUTCFullYear()
            )
          })

          if (todayEvents.length < 1 && isMobile) return <></>

          return (
            <div
              css={css`
                position: relative;
                display: flex;

                :before {
                  padding-bottom: 100%;
                  content: "";
                  display: block;
                }

                ${index === 0 &&
                css`
                  grid-column: ${isMobile ? "1" : firstDayInMonthPosition + 1};
                `}
              `}
            >
              <div
                css={css`
                  /* position: absolute; */
                  top: 2em;
                  right: 0;
                  bottom: 0;
                  left: 0;
                  z-index: 1;
                  height: 100%;

                  /* stylelint-disable-next-line */
                  ::-webkit-scrollbar {
                    display: none;
                  }
                `}
              >
                <ul
                  css={css`
                    min-height: 100%;
                    /* display: flex;
                    flex-flow: column;
                    justify-content: center; */
                    font-size: ${27 / 33}em;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    margin-top: 3em;
                    margin-right: 1em;
                  `}
                >
                  {todayEvents.map((event) => (
                    <Event event={event} />
                  ))}
                </ul>
              </div>

              <time
                css={css`
                  position: absolute;
                  display: flex;
                  justify-content: left;
                  /* justify-content: center; */
                  width: 2ch;
                  color: #000;
                  /* margin-left: 0.25em; */
                  font-size: ${94 / 32}em;

                  /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
                  font-family: "Adieu";
                `}
                dateTime={`${year}-${month + 1}-${index + 1}`}
              >
                {index + 1}
              </time>
            </div>
          )
        })}
    </>
  )
}

export default Dates
