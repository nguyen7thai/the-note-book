export const BREAK_POINT = 640

import MediaQuery from 'react-responsive'
import React from 'react'

export function Desktop({ children }) {
  return <MediaQuery minWidth={BREAK_POINT}>
    { children }
  </MediaQuery>
}

export function Mobile({ children, ...props }) {
  return <MediaQuery maxWidth={BREAK_POINT} {...props}>
    { children }
  </MediaQuery>
}
