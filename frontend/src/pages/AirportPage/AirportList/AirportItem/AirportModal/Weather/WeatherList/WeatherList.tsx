import { useQuery } from 'react-query'
import styles from './weatherList.module.scss'
import { queryKeys } from 'utils'
import { getWeatherApi } from 'services/weather'
import WeatherItem from '../WeatherItem/WeatherItem'

interface IProps {
  cityName: string
}

export default function WeatherList({ cityName }: IProps) {
  const { data } = useQuery(queryKeys.weatherList(cityName), () => getWeatherApi(cityName), {
    suspense: true,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  })

  if (!data) return null
  return (
    <ul className={styles.wrapper}>
      {data.map((d) => (
        <WeatherItem key={d.dt} data={d} />
      ))}
    </ul>
  )
}