import { createSlice } from "@reduxjs/toolkit";

export const metamaskSlice = createSlice({
  name: "metamask",
  initialState: {
    currentChain: {
      chainId: 0,
      rpc: "",
      name: "",
      coinName: "",
      explorerURL: "",
      icon: "",
    },
    accounts: [],
    currentAccount: "",
    currentBalance: 0,
  },
  reducers: {
    setBalance: (state, action) => {
      state.currentBalance = action.payload;
    },
    setCurrentChain: (state, action) => {
      state.currentChain = action.payload;
    },
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setCurrentAccount: (state, action) => {
      state.currentAccount = action.payload;
    },
  },
});

export const metamaskActions = metamaskSlice.actions;
