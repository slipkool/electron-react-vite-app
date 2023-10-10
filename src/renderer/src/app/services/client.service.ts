import http from '@renderer/conf/http-common'
import { Client } from '@renderer/app/models/client.model'
import { CLIENTS_ENDPOINT } from '../core/appConstants'
import { CreateClientDto, UpdateClientDto } from '../dtos/client.dto'

const getClientUrl = (id): string => `${CLIENTS_ENDPOINT}/${id}`

const responseBody = (response) => response.data

const fetchClients = () => {
  return http.get<Client[]>(CLIENTS_ENDPOINT).then(responseBody)
}

const deleteClient = (id) => {
  return http.delete(getClientUrl(id)).then(responseBody)
}

const addClient = (client: CreateClientDto) => {
  return http.post(CLIENTS_ENDPOINT, client).then(responseBody)
}

const updateClient = (id, product: UpdateClientDto) => {
  return http.patch(getClientUrl(id), product).then(responseBody)
}

const ClientService = {
  fetchClients,
  deleteClient,
  addClient,
  updateClient
}

export default ClientService
