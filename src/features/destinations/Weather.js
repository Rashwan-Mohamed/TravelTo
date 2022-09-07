import React, { useState, useEffect, Fragment } from 'react'

const Weather = ({ forecast }) => {
  if (forecast === 'error' || !forecast) {
    return <h1 className='error'>Sorry can't obtain weather info...</h1>
  }

  const {
    description,
    timezone,
    currentConditions: {
      datetime,
      temp,
      conditions,
      humidity,
      icon,
      sunrise,
      sunset,
    },
    days,
    alerts,
  } = forecast
  return (
    <article className='weather-conditions'>
      <h1>Weather info</h1>

      <div>
        <h1>Date</h1>
        <h1>Temp</h1>
        <h1>humidity</h1>
        <h1>conditions</h1>
        <h1>sunrise</h1>
        <h1>sunset</h1>
        <h2>current</h2>
        <h2>{temp} F</h2>
        <h2>{humidity}%</h2>
        <h2>
          {conditions} <img src={`4th Set - Color/${icon}.svg`} alt='' />{' '}
        </h2>
        <h2>{sunrise}</h2>
        <h2>{sunset}</h2>

        {days.slice(0, 3).map((day) => {
          const {
            datetime,
            temp,
            conditions,
            humidity,
            icon,
            sunrise,
            sunset,
          } = day

          return (
            <Fragment key={datetime}>
              <h2>{datetime}</h2>
              <h2>{temp} F</h2>
              <h2>{humidity}%</h2>
              <h2>
                {conditions} <img src={`4th Set - Color/${icon}.svg`} alt='' />{' '}
              </h2>
              <h2>{sunrise}</h2>
              <h2>{sunset}</h2>
            </Fragment>
          )
        })}
      </div>
      <h3>
        <span>General desc</span> {description}
      </h3>
    </article>
  )
}
export default Weather
