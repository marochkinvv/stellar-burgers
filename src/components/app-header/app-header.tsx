import { FC, useEffect, useState } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserSelector, isAuthSelector } from '../../slices/userSlice';

export const AppHeader: FC = () => {
  const userData = useSelector(getUserSelector);
  const isAuth = useSelector(isAuthSelector);
  const [userName, setUserName] = useState('Личный кабинет');

  useEffect(() => {
    if (isAuth) {
      setUserName(userData.name);
    } else {
      setUserName('Личный кабинет');
    }
  }, [isAuth, userData]);

  return <AppHeaderUI userName={userName} />;
};
