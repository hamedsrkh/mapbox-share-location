import Axios from './index'
import {Pin} from "../Types";

interface ServerData {
    [id: string]: Pin
}

export const getLocations: () => Promise<Pin[]> = async () => {
    const response = await Axios.get('/locations.json')
    const data = response.data as ServerData
    return Object.keys(data).map((id) => {
        return {
            id,
            ...data[id]
        } as Pin
    })

}

export const storeLocations = async (payload: any) => {
    return await Axios.post('/locations.json', payload)
}