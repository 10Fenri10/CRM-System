import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuth = () => {
	const { isAuthorized, status, user } = useAppSelector(state => state.auth)
	return { isAuthorized, status, user }
}
