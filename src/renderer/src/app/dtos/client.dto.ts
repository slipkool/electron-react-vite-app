import { Client } from "../models/client.model";

export interface ClientDto {
  id: number;
  nombre: string;
  tipo_documento: string;
  identificacion: string;
  direccion: string;
  telefono: number;
  correo: string;
}

export interface CreateClientDto extends Omit<Client, "id"> {}

export interface UpdateClientDto extends Partial<CreateClientDto> {
  id: number;
}

export const clientDtoToClientModel = (clientDto: ClientDto): Client => {
  const client: Client = {
    id: +clientDto.id,
    name: clientDto.nombre,
    documentType: clientDto.tipo_documento,
    identification: clientDto.identificacion,
    address: clientDto.direccion,
    phone: clientDto.telefono,
    email: clientDto.correo,
  };
  return client;
};

export const clientDtoToClientModelList = (
  clientDtoList: ClientDto[],
): Client[] => {
  return clientDtoList.map((clientDto) => clientDtoToClientModel(clientDto));
};
