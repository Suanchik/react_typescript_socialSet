import React from 'react';

type InputTypeProps = {
    errors: any;
    register: any;
    type: string;
    name: string;
    placeholder: string
}

const InputLogin: React.FC<InputTypeProps> = ({errors, register, type, name, placeholder}) => {
    return (
        <div className='input'>
            <input 
            placeholder={placeholder}
            className={errors ? 'errorInpot': ''}
            type={type}
            {...register(name, {required: 'required for input', maxLength: 50})}/>
            <div className='error'>{
                errors ?
                <div>
                    {
                        errors.type === 'required' ?
                        <div>{errors.message} of<span className='discription'> {name}</span></div>:
                        <div>too long {name}</div>
                    }
                </div>:
                <div className='discription'>{name}</div>
            }</div>
        </div>
    )
};

export default InputLogin;