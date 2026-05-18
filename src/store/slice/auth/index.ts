import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as authApi from '../../../api/authApi'
import type { AuthData } from '../../../types/auth'

type AuthStatus =
	| 'checking'
	| 'authenticated'
	| 'unauthenticated'
	| 'loading'
	| 'failed'

type AuthState = {
	user: null
	accessToken: string | null
	isAuthorized: boolean
	status: AuthStatus
	error: string | null
}

const initialState: AuthState = {
	user: null,
	accessToken: null,
	isAuthorized: false,
	status: 'checking',
	error: null,
}

export const loginThunk = createAsyncThunk<
	{ accessToken: string; refreshToken: string },
	AuthData,
	{ rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
	try {
		return await authApi.login(credentials)
	} catch (e) {
		return rejectWithValue(e instanceof Error ? e.message : 'Ошибка входа')
	}
})

export const restoreSessionThunk = createAsyncThunk<
	{ accessToken: string; refreshToken: string },
	void,
	{ rejectValue: string }
>('auth/restoreSession', async (_, { rejectWithValue }) => {
	try {
		void _
		return await authApi.restoreSession()
	} catch (e) {
		return rejectWithValue(e instanceof Error ? e.message : 'Session error')
	}
})

export const logoutThunk = createAsyncThunk<
	void,
	void,
	{ rejectValue: string }
>('auth/logout', async (payload, { rejectWithValue }) => {
	try {
		void payload
		await authApi.logout()
	} catch (e) {
		return rejectWithValue(e instanceof Error ? e.message : 'Logout error')
	}
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.user = null
			state.accessToken = null
			state.isAuthorized = false
			state.status = 'unauthenticated'
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(loginThunk.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.status = 'authenticated'
				state.user = null
				state.accessToken = action.payload.accessToken
				state.isAuthorized = true
				state.error = null
			})
			.addCase(loginThunk.rejected, (state, action) => {
				state.status = 'failed'
				state.user = null
				state.accessToken = null
				state.isAuthorized = false
				state.error = action.payload ?? 'Ошибка входа'
			})
			.addCase(restoreSessionThunk.pending, state => {
				state.status = 'checking'
			})
			.addCase(restoreSessionThunk.fulfilled, (state, action) => {
				state.status = 'authenticated'
				state.user = null
				state.accessToken = action.payload.accessToken
				state.isAuthorized = true
				state.error = null
			})
			.addCase(restoreSessionThunk.rejected, state => {
				state.status = 'unauthenticated'
				state.user = null
				state.accessToken = null
				state.isAuthorized = false
				state.error = null
			})
			.addCase(logoutThunk.fulfilled, state => {
				state.user = null
				state.accessToken = null
				state.isAuthorized = false
				state.status = 'unauthenticated'
				state.error = null
			})
	},
})

export const { logout } = authSlice.actions
export default authSlice.reducer
