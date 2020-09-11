import React from "react"

// Na mniejszym ekranie wiecej niz jedna plyke zrobic, zeby wygodniej bylo
// min 3 plytki najlepiej

export const Beer = () => {
  return (
    <div className="beer">
      <div className="background"></div>
    </div>
  )
}

const Beers = () => (
  <div className="beers">
    <Beer></Beer>
    <Beer></Beer>
    <Beer></Beer>
    <Beer></Beer>
    <Beer></Beer>
    <Beer></Beer>
    <Beer></Beer>
    <Beer></Beer>
    <Beer></Beer>
    <Beer></Beer>
  </div>
)

export default Beers
