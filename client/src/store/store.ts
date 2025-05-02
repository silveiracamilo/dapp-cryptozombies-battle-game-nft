import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cryptokittiesApi } from "./api/cryptokitties/api";
import { cryptozombiesBattleApi } from "./api/cryptozombiesBattle/api";

const reducers = combineReducers({
	[cryptokittiesApi.reducerPath]: cryptokittiesApi.reducer,
	[cryptozombiesBattleApi.reducerPath]: cryptozombiesBattleApi.reducer,
});

export const makeStore = () =>
	configureStore({
		reducer: reducers,
		devTools: true,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}).concat(
				cryptokittiesApi.middleware,
				cryptozombiesBattleApi.middleware
			),
	});

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default store;
