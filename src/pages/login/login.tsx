import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import {
  errorUser,
  getUser,
  isAuthSelector,
  loginUser
} from '../../slices/userSlice';
import { AppDispatch } from '../../services/store';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(isAuthSelector);
  const error = useSelector(errorUser);
  const localStorageEmail = localStorage.getItem('email') ?? '';
  const [email, setEmail] = useState(localStorageEmail);
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    dispatch(loginUser({ email: email, password: password }));
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
