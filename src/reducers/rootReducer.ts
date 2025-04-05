import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { feedsSlice } from '../slices/feedsSlice';
import { userSlice } from '../slices/userSlice';
import { ordersSlice } from '../slices/ordersSlice';

const rootReducer = combineSlices(
  ingredientsSlice,
  feedsSlice,
  ordersSlice,
  userSlice
  // Здесь могут быть другие редюсеры
);

export default rootReducer;
