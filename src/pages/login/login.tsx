import { FC, SyntheticEvent, useCallback, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  errorUser,
  getUserSelector,
  isLoadingSelector,
  loginUser
} from '../../slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(errorUser);
  const userData = useSelector(getUserSelector);
  const loading = useSelector(isLoadingSelector);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(loginUser({ email, password }))
        .unwrap()
        .then(() => {
          navigate('/', { replace: true });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [email, password, navigate, dispatch]
  );

  if (loading) {
    return <Preloader />;
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
