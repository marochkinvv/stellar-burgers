import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { feedsSlice } from '../slices/feedsSlice';
import { userSlice } from '../slices/userSlice';
import { ordersSlice } from '../slices/ordersSlice';
import { burgerConstructorSlice } from '../slices/burgerConstructorSlice';

const rootReducer = combineSlices(
  ingredientsSlice,
  feedsSlice,
  ordersSlice,
  userSlice,
  burgerConstructorSlice
);

export default rootReducer;
