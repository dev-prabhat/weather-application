import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles.css'
import WeatherCard from './WeatherCard'

const api = "2a9c6e8ec5defd55757c9272b064ae4d"

const Weather = () => {

    const [searchValue, setSearchValue] = useState("Varanasi")
    const [weatherReport, setWeatherReport] = useState({})

    const getInfo = (e) => {
        e.preventDefault()
        getWeatherInfo()
    }

    const getWeatherInfo = async () => {
        try {
            var data = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${api}`)

            const { humidity, pressure, temp } = data.data.main
            const { main: weathermood } = data.data.weather[0]
            const { name } = data.data
            const { country, sunset } = data.data.sys
            const { speed } = data.data.wind
            const myWeatherReport = {
                temp, pressure, humidity, weathermood, name,
                country, sunset, speed
            }
            setWeatherReport(myWeatherReport)

        } catch (error) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        getWeatherInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="warp">
                <form onSubmit={getInfo}>
                    <div className="search">
                        <input type="search"
                            placeholder="search..."
                            autoFocus
                            className="searchTerm"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button
                            className="searchButton"
                            type="button"
                            onClick={getInfo}
                        >Search</button>
                    </div>
                </form>
            </div>
            <WeatherCard {...weatherReport} />
        </div>
    )
}

export default Weather;