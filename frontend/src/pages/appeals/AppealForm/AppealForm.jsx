import { useEffect, useState } from 'react'
import Request, { BACKEND_URLS } from 'src/utils/Request.ts'
import { savingSentData } from 'src/utils/savingSentData'
import InputLabel from 'src/UI/Inputs/InputLabel'
import { useAuth } from 'src/context/AuthContext'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './AppealForm.css'

const toolbarOptions = [
	[{ size: [false, 'large'] }],
	['bold', 'italic', 'underline'],
	[{ list: 'ordered' }],
	['clean'],
]

const AppealForm = () => {
	const { token } = useAuth()
	const request = token ? new Request(token) : undefined

	const [submitMessage, setSubmitMessage] = useState('')
	const [appealForm, setAppealForm] = useState({ theme: '', content: '' })

	const handleChangeAppealForm = e => {
		const { name, value } = e.target
		setAppealForm(prevState => ({ ...prevState, [name]: value }))
	}

	const handleChangeContent = value => {
		setAppealForm(prevState => ({ ...prevState, content: value.toString() }))
	}

	const handleSubmitAppealsForm = async e => {
		e.preventDefault()
		if (!request) {
			return
		}
		if (!appealForm.theme.trim() || !appealForm.content.trim()) {
			return
		}
		try {
			const data = await request.post(BACKEND_URLS['CREATE_APPEAL'], appealForm)
			if (data.status !== 'error') {
				setAppealForm({ theme: '', content: '' })
			}
			setSubmitMessage(data.message)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		const localAppealForm = JSON.parse(localStorage.getItem('appealForm'))
		if (localAppealForm) {
			setAppealForm(localAppealForm)
			localStorage.removeItem('appealForm')
		}

		return () => {
			// Сохраняем состояние формы в localStorage при размонтировании компонента
			savingSentData(appealForm, 'appealForm')
		}
	}, [])

	return (
		<form id='AppealForm' onSubmit={handleSubmitAppealsForm}>
			<div id='ThemeInput'>
				<InputLabel
					value={appealForm.theme}
					name='theme'
					handleChange={handleChangeAppealForm}
					labelText={'Тема'}
				/>
			</div>
			<div>
				<ReactQuill
					modules={{ toolbar: toolbarOptions }}
					theme='snow'
					value={appealForm.content}
					placeholder='Введите текст'
					onChange={handleChangeContent}
				/>
			</div>

			<button id='appealsSubmit' type='submit'>
				Создать
			</button>
			{submitMessage && (
				<div id='message' style={{ color: 'red' }}>
					{JSON.stringify(submitMessage)}
				</div>
			)}
		</form>
	)
}

export default AppealForm
