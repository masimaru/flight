export interface IAirportItem {
  _id: string
  iata: string
  name: string
  nameKo: string
  countryNameKo: string
  cityName: string
  cityNameKo: string
  likeCount: number
  commentCount: number
}

export interface IIncLikeParam {
  _id: string
  likeCount: number
}

export interface IAirportSearchParam {
  condition: string
  search: string
}
