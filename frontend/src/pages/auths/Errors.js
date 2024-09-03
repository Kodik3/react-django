export const checkRequirements = (form, requirements, all = false) => {
	if (all) {
		requirements = Object.keys(form)
	}
	for (const value of requirements) {
		if (!form[value]) {
			return {
				status: 'error',
				message: `Заполните поле ${value}`,
			}
		}
	}
	return { status: 'success' }
}

export const checkPasswords = (password, password2) => {
	if (password !== password2) {
		return {
			status: 'error',
			message: 'Пароли не совпадают',
		}
	}

	if (password.length < 8 || password2.length < 8) {
		return {
			status: 'error',
			message: 'Пароль должен содержать не менее 8 символов',
		}
	}
	return { status: 'success' }
}
