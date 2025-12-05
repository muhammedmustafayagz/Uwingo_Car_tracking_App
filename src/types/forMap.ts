export type TrackedUserDTO = {
  id: string
  plate:string
  latitude: number
  longitude: number
  bearing?: number // Direction of movement in degrees (0–360)
  speed?: number
  totalKM:number
  violationType?:string
  // ts: number // Timestamp of THIS user's position (unix milliseconds)
}

export type TrackingSnapshotDTO = {
  serverTime: number
  users: TrackedUserDTO[] // Full list of ACTIVE tracked users at that moment
}








export type TrackingDelta = {

  //?  by using Delta we will prevents
  //-  Full marker re-renders
  //-  1000 DOM diffs every minute
  //-  Battery drain

stale: TrackedUserDTO[]

  added: TrackedUserDTO[] // Users that exist in NEXT but NOT in PREVIOUS
  updated: TrackedUserDTO[] // Same ID exists in both, BUT position or bearing changed
  removed: string[] // IDs that existed before but disappeared
}


// types.ts
export type FinalMapDTO = {
  // isBlocked: boolean
  Suffix: string | null

  trackingData: {
    // DateTime: string
    Latitude: number | string
    Longitude: number | string
    OutPutStatus: boolean
    SerialNumber: string
    speed: number
    Suffix: string | null
    WorkingStatus: boolean
  }

  vehicles: {
    CompnayApplicationId: string
    FirstKilometer: number
    IsItForRent: boolean
    IsThereDriver: boolean
    Make: string
    Model: string
    Plate: string
    VIN: string
    VehicleId: number
    Year: number
  }
}
