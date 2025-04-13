import {
  isAuthSelector,
  isLoadingSelector,
  getUserSelector,
  getUser
} from '../../slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookie';
import { useDispatch, useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  onlyAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  onlyAuth,
  children
}: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const user = useSelector(getUserSelector);
  const isLoading = useSelector(isLoadingSelector);
  const location = useLocation();

  useEffect(() => {
    const token = getCookie('accessToken');
    if (token && !isAuth && !isLoading) {
      dispatch(getUser());
    }
  }, [isAuth, isLoading, dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!isAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyAuth && !isAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
