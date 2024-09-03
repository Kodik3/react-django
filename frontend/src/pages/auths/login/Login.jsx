import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as UI from '../UI/index'
import { checkRequirements } from '../Errors'
import Request, { BACKEND_URLS } from 'src/utils/Request'
import { useAuth } from 'src/context/AuthContext'
import './Login.css'

const title = 'Login'

const Login = () => {
	const { token, updateToken } = useAuth()
	const navigate = useNavigate()
	const request = new Request()
	const [message, setMessage] = useState('')
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	useEffect(() => {
		// если пользователь авторизован перекидываем на его профиль
		if (token) {
			navigate('/profile')
			toast.error('Вы уже авторизованы')
		} else {
			document.title = title
		}
	}, [])

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const hanldeSubmit = async e => {
		// логин пользователя
		e.preventDefault()
		const requirementsError = checkRequirements(formData, [], true)
		if (requirementsError.status === 'error') {
			setMessage(requirementsError.message)
			return
		}
		if (formData.password.length < 8) {
			setMessage('Пароль должен содержать не мение 8 символов!')
		}
		try {
			const data = await request.post(BACKEND_URLS['LOGIN'], formData)
			console.log(data)
			if (data.status === 'error') {
				setMessage(data.message)
				return
			} else {
				setMessage(data.message)
				localStorage.setItem('token', data.data.token)
				updateToken(data.data.token)
				localStorage.setItem('user', JSON.stringify(data.data.user))
				if (data.data.is_Admin) {
					localStorage.setItem('is_Admin', data.data.is_Admin)
				}
				toast.success('Вы успешно вошли в аккаунт')
				navigate('/profile')
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div id='loginBlock'>
			<h1>Авторизация</h1>
			<form action='' onSubmit={hanldeSubmit}>
				<UI.AuthInput
					value={formData.email}
					type='email'
					name='email'
					placeholder='Email'
					onChange={handleChange}
				/>
				<UI.AuthInput
					value={formData.password}
					type='password'
					name='password'
					placeholder='Password'
					onChange={handleChange}
				/>
				<UI.AuthButton type='submit'>Авторизация</UI.AuthButton>
			</form>
			{message && <p id='message'>{message}</p>}
		</div>
	)
}

export default Login
