export function savingSentData(obj, localName) {
	const keys = Object.keys(obj)
	if (keys.length > 0) {
		const dataToSave = {}
		keys.forEach(key => {
			dataToSave[key] = obj[key]
		})
		localStorage.setItem(localName, JSON.stringify(dataToSave))
	}
}
