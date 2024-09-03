export const dict_response = (status: string, message: string) => {
	const STATUSES = ['success', 'error']
	if (!STATUSES.includes(status)) {
		throw new Error('bad status')
	}
	return {
		status: status,
		message: message,
	}
}

export const PasswordValidator = (
	password: string,
	password2: string,
	password_length: number = 8
) => {
	if (password.length < password_length) {
		return dict_response(
			'error',
			`Длина пароля должна быть не меньше ${password_length}`
		)
	}
	if (password !== password2) {
		return dict_response('error', 'Пароли не совподают')
	}
	if (/\s/.test(password)) {
		return dict_response('error', 'Пароль не должен содержать пробелы')
	}
}
