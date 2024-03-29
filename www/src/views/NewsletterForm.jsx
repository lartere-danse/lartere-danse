// vendors
/** @jsx jsx */
import { jsx } from "@emotion/react"
import React from "react"
import { css } from "@emotion/react"
import Button from "../components/Button"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { Formik, Form, Field } from "formik"
import { colors } from "../styles/variables"

const NewsletterForm = ({ themeColor }) => {
  const buttonColor =
    themeColor === "ORANGE" ? colors.PortlandOrange : colors.Jet

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0;
      `}
    >
      <div
        css={css`
          flex-basis: 50%;
          flex-grow: 1;
        `}
      >
        <p
          css={css`
            font-size: ${96 / 33}em;
          `}
        >
          S'abonner <br />à l'infolettre <br />
          de L'Artère.
        </p>
      </div>

      <div
        css={css`
          flex-basis: 0;
          flex-grow: 999;
          min-inline-size: 320px;
        `}
      >
        <Formik
          initialValues={{ email: "" }}
          validate={(values) => {
            let errors = {}
            if (!values.email) {
              errors.email = "Adresse courriel invalide"
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Adresse courriel invalide"
            }
            return errors
          }}
          onSubmit={(values, actions) => {
            addToMailchimp(values.email)
              .then((data) => {
                actions.setSubmitting(false)
                actions.setStatus(data)
              })
              .catch(() => {
                actions.setSubmitting(false)
                actions.setStatus({
                  result: "error",
                  msg: "Un problème est survenu, veuillez réessayer plus tard.",
                })
              })
          }}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <label
                htmlFor="email"
                css={css`
                  display: flex;
                  flex-direction: column;
                `}
              >
                <span
                  css={css`
                    display: block;
                    font-size: ${24 / 33}em;
                    /* margin-bottom: 1em; */
                  `}
                >
                  votre courriel
                </span>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  css={css`
                    /* width: 100%; */
                    line-height: 50px;
                    font-size: ${36 / 33}em;
                    margin-bottom: 1em;
                  `}
                />
              </label>

              {/* <ErrorMessage name="email" /> */}

              {status && <p dangerouslySetInnerHTML={{ __html: status.msg }} />}

              {!(status && status.result === "succes") && (
                <div>
                  <Button
                    type="submit"
                    css={css`
                      text-transform: uppercase;

                      && {
                        background-color: ${buttonColor} !important;
                      }
                    `}
                    disable={isSubmitting ? isSubmitting : undefined}
                  >
                    S'abonner
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default NewsletterForm
