import { Password } from 'primereact/password';
import './style.css';


const PasswordInputLabel = ({ handleChange, labelText, name, value }) => {
    return (
        <span id='InputLabel' className="p-float-label">
            <Password
                className='InputLabel-input'
                style={{width:'500px'}}
                inputId="password"
                value={value}
                name={name}
                onChange={handleChange}
                toggleMask
                feedback={false}
            />
            <label className='InputLabel-label' htmlFor="password">{labelText}</label>
        </span>
    );
};

export default PasswordInputLabel;