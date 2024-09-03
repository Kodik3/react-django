import { InputText } from 'primereact/inputtext'
import './style.css'

const InputLabel = ({ handleChange, labelText, name, value }) => {
	return (
		<span id='InputLabel' className='p-float-label'>
			<InputText
				type='text'
				className='InputLabel-input'
				id='ipt_'
				name={name}
				value={value}
				onChange={handleChange}
			/>
			<label className='InputLabel-label' htmlFor='ipt_'>
				{labelText ? labelText : 'fill labelText'}
			</label>
		</span>
	)
}

export default InputLabel
