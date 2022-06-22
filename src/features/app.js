import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    value: 0,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
      state.ChannelArray = action.payload.ChannelArray;
    },
  },
});

export const { enterRoom } = appSlice.actions;

export const selectChannelId = state => state.app.channelId;
export const selectchannelName = state => state.app.channelName;
export const selectChannelArray = state => state.app.ChannelArray;

export default appSlice.reducer;
