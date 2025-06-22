import axios from 'axios'
import { useAppStore } from '@/store/app'

export const fetchUserMe = async () => {
  const token = localStorage.getItem('token')
  const appStore = useAppStore()

  if (!token) throw new Error('No token')

  const { data } = await axios.get(`${appStore.apiURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  appStore.userData = data
  return data
}
