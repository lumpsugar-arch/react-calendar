import React from 'react'

export const Loader = () => {
  return (
    // taken from https://loading.io/css/
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
};