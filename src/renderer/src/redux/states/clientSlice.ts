import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateClientDto,
  UpdateClientDto,
  clientDtoToClientModel,
  clientDtoToClientModelList,
} from "@renderer/app/dtos/client.dto";
import { Client } from "@renderer/app/models/client.model";
import ClientService from "@renderer/app/services/client.service";

export interface ClientState {
  clients: Client[];
  loading: boolean;
  error: string | null;
  searchData: Client[];
}

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
  searchData: [],
};

export const fetchClients = createAsyncThunk("clients/fetch", async () => {
  const result = await ClientService.fetchClients();
  return clientDtoToClientModelList(result);
});

export const deleteClient = createAsyncThunk(
  "clients/delete",
  async (id: number) => {
    const result = await ClientService.deleteClient(id);
    return result;
  },
);

export const addClient = createAsyncThunk(
  "clients/create",
  async (client: CreateClientDto) => {
    const result = await ClientService.addClient(client);
    return clientDtoToClientModel(result);
  },
);

export const updateClient = createAsyncThunk(
  "clients/update",
  async (client: UpdateClientDto) => {
    const result = await ClientService.updateClient(client.id, client);
    return clientDtoToClientModel(result);
  },
);

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    searchClient: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = [...action.payload];
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(addClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.push(action.payload);
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = state.clients.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele,
        );
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.clients = state.clients.filter(
            (ele) => ele.id !== parseInt(id),
          );
        }
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default clientSlice.reducer;

export const { searchClient } = clientSlice.actions;
