import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './App.module.css';

const sendData = (formData) => {
	console.log(formData);
};

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Недействительный адрес электронной почты')
		.required('Электронная почта обязательна'),
	password: Yup.string()
		.matches(/^[\w_]*$/, 'Пароль должен содержать только буквы и цифры')
		.min(5, 'Пароль должен содержать минимум 5 символов')
		.required('Пароль обязателен'),
	repeatPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
		.required('Повторите пароль'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data) => {
		sendData(data);
	};

	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{errors.email && (
					<div className={styles.errorLabel}>{errors.email.message}</div>
				)}
				<input
					name="email"
					type="email"
					placeholder="Почта"
					{...register('email')}
				/>
				{errors.password && (
					<div className={styles.errorLabel}>{errors.password.message}</div>
				)}
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					{...register('password')}
				/>
				{errors.repeatPassword && (
					<div className={styles.errorLabel}>
						{errors.repeatPassword.message}
					</div>
				)}
				<input
					name="repeatPassword"
					type="password"
					placeholder="Повторите пароль"
					{...register('repeatPassword')}
				/>
				<button type="submit">Зарегистрироваться</button>
			</form>
		</div>
	);
};
