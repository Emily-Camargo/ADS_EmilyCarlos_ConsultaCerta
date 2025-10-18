import { Updater } from "use-immer"
import { DataReq } from "./interfaces"

export function handleChange<K extends keyof DataReq>(
    key: K,
    value: DataReq[K],
    setData: Updater<DataReq>,
  ) {
    setData((v) => {
      v[key] = value
    })
}