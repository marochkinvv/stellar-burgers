import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { FC } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

export const App: FC = () => {
  const navigate = useNavigate(); // Получаем функцию навигации
  const location = useLocation();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal
              title={'Заказ'}
              onClose={() => {
                navigate('/feed');
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />

        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title={'Ингредиенты'}
              onClose={() => {
                navigate('/');
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title={'Заказ'}
              onClose={() => {
                console.log('modal');
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};
