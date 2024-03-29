import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import styles from './flightList.module.scss'
import { IFlightItem } from 'types/flight'
import FlightItem from './FlightItem/FlightItem'
import FlightShareItems from './FlightItem/FlightShareItems'

interface IProps {
  dataList: IFlightItem[]
}

export default function FlightList({ dataList }: IProps) {
  const [flightDatas, setFlightDatas] = useState<(IFlightItem | IFlightItem[])[]>([])
  const [isDepart, setIsDepart] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setIsDepart(!location.pathname.startsWith('/arrive'))
  }, [location])

  useEffect(() => {
    const result = dataList
      .reduce((acc: IFlightItem[][], cur) => {
        if (cur.codeshare === 'Slave') {
          const { length } = acc
          acc[length - 1].push(cur)
          return acc
        }

        return [...acc, [cur]]
      }, [])
      .map((item) => (item.length === 1 ? item[0] : item))
    setFlightDatas(result)
  }, [dataList])

  return (
    <article className={styles.wrapper}>
      <header className={styles.title}>
        <div className={styles.t1}>{isDepart ? '출발시간' : '도착시간'}</div>
        <div className={styles.t2}>{isDepart ? '목적지' : '출발지'}</div>
        <div className={styles.t3}>항공사</div>
        <div className={styles.t4}>터미널</div>
        <div className={styles.t5}>게이트</div>
      </header>

      <div className={styles.flightWrapper}>
        <ul className={styles.list}>
          {!flightDatas.length && <li className={styles.none}>운항 스케줄이 없습니다.</li>}
          {flightDatas.map((data) =>
            Array.isArray(data) ? (
              <FlightShareItems key={`Items-${data[0].estimatedDateTime}-${data[0].flightId}`} items={data} />
            ) : (
              <FlightItem key={`${data.estimatedDateTime}-${data.flightId}`} item={data} />
            )
          )}
        </ul>
      </div>
    </article>
  )
}
