import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  response: {},
  status: 'idle',
  error: null,
  search: '',
}

export const fetchDestination = createAsyncThunk(
  'destinations/fetchDestination',
  async (state) => {
    let auth = btoa(`${process.env.REACT_APP_ACCESS_KEY}`)
    try {
      let url = `https://api.roadgoat.com/api/v2/destinations/${state}`
      const response = await fetch(url, {
        method: 'GET',
        hostname: 'api.roadgoat.com',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      })
      const data = await response.json()
      return data
    } catch (error) {}
  }
)

const destionationsSlice = createSlice({
  name: 'destionations',
  initialState,
  reducers: {
    getId: (state, action) => {
      const { id } = action.payload
      state.search = id
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDestination.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchDestination.fulfilled, (state, action) => {
        if (!action.payload) {
          state.status = 'error'
        } else {
          state.status = 'success'
          state.response = action.payload
        }
      })
      .addCase(fetchDestination.rejected, (state, action) => {
        state.status = 'rejected'
      })
  },
})

export const { getId } = destionationsSlice.actions

export default destionationsSlice.reducer
