import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUser } from '../../slices/userSlice';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(registerUser({ email, password, name: userName }))
      .unwrap()
      .then((data) => {
        localStorage.setItem('refreshToken', data.refreshToken);
        setCookie('accessToken', data.accessToken);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        setErrorText(`Ошибка: ${error}`);
      });
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
