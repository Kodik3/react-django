import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import InputLabel from 'src/UI/Inputs/InputLabel.jsx'
import PasswordInputLabel from 'src/UI/Inputs/PasswordInputLabel.jsx'
import * as UI from '../UI/index'
import { checkRequirements, checkPasswords } from '../Errors.js'
import Request, { BACKEND_URLS } from 'src/utils/Request.ts'
import { useAuth } from 'src/context/AuthContext'
import './Registration.style.css'

const Registration = () => {
	const navigate = useNavigate()
	const { token } = useAuth()
	useEffect(() => {
		// если пользователь авторизован перекидываем на его профиль
		if (token) {
			navigate('/profile')
			toast.error('У вас есть аккаунт')
		} else {
			document.title = 'Registration'
		}
	})
	const request = new Request()
	const [message, setMessage] = useState('')
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		password2: '',
	})

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const hanldeSubmit = async e => {
		e.preventDefault()
		const requirementsError = checkRequirements(formData, [], true)
		if (requirementsError.status === 'error') {
			setMessage(requirementsError.message)
			return
		}

		const passwordError = checkPasswords(formData.password, formData.password2)
		if (passwordError.status === 'error') {
			setMessage(passwordError.message)
			return
		}

		const copyFormData = { ...formData }
		delete copyFormData['password2']

		try {
			const data = await request.post(
				BACKEND_URLS['REGISTRATION'],
				copyFormData
			)
			if (data.status === 'error') {
				if (data.message.email) {
					setMessage(data.message.email[0])
					return
				}
				setMessage(data.message)
				return
			} else {
				setMessage(data.message)
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='registration-block'>
			<div className='registration-header'>
				<Link to='/'>
					<img src={''} alt='logo' className='logo' />
				</Link>
			</div>
			<div className='registration-body'>
				<div className='registration-wrapper'>
					<div className='registration-title'>Регистрация</div>
					<form className='RegForm' method='POST' onSubmit={hanldeSubmit}>
						<div className='fullName'>
							<div className='NameBlock'>
								<InputLabel
									value={formData.first_name}
									name='first_name'
									handleChange={handleChange}
									labelText={'First name'}
								/>
							</div>
							<div className='NameBlock'>
								<InputLabel
									value={formData.last_name}
									name='last_name'
									handleChange={handleChange}
									labelText={'Last name'}
								/>
							</div>
						</div>
						<div className='EmailBlock'>
							<InputLabel
								value={formData.email}
								name='email'
								handleChange={handleChange}
								labelText={'Email'}
							/>
						</div>
						<div className='Passwords'>
							<div className='PasswordBlock'>
								<PasswordInputLabel
									value={formData.password}
									handleChange={handleChange}
									labelText={'Password'}
									name='password'
								/>
							</div>
							<div className='PasswordBlock'>
								<PasswordInputLabel
									value={formData.password2}
									handleChange={handleChange}
									labelText={'Reapet password'}
									name='password2'
								/>
							</div>
						</div>
						<UI.AuthButton type='submit'>Регистрация</UI.AuthButton>
					</form>
					{message && <p id='message'>{message}</p>}
				</div>
				<div className='registration-footer'></div>
			</div>
		</div>
	)
}

export default Registration
