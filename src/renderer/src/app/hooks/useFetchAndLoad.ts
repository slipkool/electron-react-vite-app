import { AxiosCall } from '@renderer/app/models/axios-call.model'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false)
  let controller: AbortController

  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    if (axiosCall.controller) controller = axiosCall.controller
    setLoading(true)
    let result = {} as AxiosResponse<any>
    try {
      result = await axiosCall.call
    } catch (err) {
      setLoading(false)
      throw err
    }
    setLoading(false)
    return result
  }

  const cancelEndpoint = (): void => {
    setLoading(false)
    controller?.abort()
  }

  useEffect(() => {
    return (): void => {
      cancelEndpoint()
    }
  }, [])

  return { loading, callEndpoint }
}

export default useFetchAndLoad
