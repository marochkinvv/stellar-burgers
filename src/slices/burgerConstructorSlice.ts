import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface BurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  ingredientCounts: { [key: string]: number };
  list: string[];
  orderRequest: boolean;
  error: boolean;
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
  ingredientCounts: {},
  list: [],
  orderRequest: false,
  error: false
};

export const createOrder = createAsyncThunk('orders/create', orderBurgerApi);

const updateList = (state: BurgerConstructorState) => {
  const bunId = state.bun?._id;
  const ingredientsId = state.ingredients.map((ing) => ing._id);
  if (bunId) {
    state.list = [bunId, ...ingredientsId, bunId];
  } else {
    state.list = [];
  }
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, action) {
      const ingredientId = action.payload._id;
      if (action.payload.type !== 'bun') {
        state.ingredients.push(action.payload);
        state.ingredientCounts[ingredientId] =
          (state.ingredientCounts[ingredientId] || 0) + 1;
      } else {
        state.bun = action.payload;
      }
      updateList(state);
    },
    moveUpIngredient(state, action) {
      const index = action.payload;
      if (index > 0) {
        const ingredientToMove = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, ingredientToMove);
      }
    },
    moveDownIngredient(state, action) {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const ingredientToMove = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, ingredientToMove);
      }
    },
    removeIngredient(state, action) {
      const index = action.payload;
      if (index !== -1) {
        const ingredientId = state.ingredients[index]._id;
        state.ingredients.splice(index, 1);
        if (state.ingredientCounts[ingredientId]) {
          state.ingredientCounts[ingredientId] -= 1;
          if (state.ingredientCounts[ingredientId] === 0) {
            delete state.ingredientCounts[ingredientId];
          }
        }
      }
    },
    getConstructor(state) {
      const bunId = state.bun?._id;
      const ingredientsId = state.ingredients.map((ing) => ing._id);
      if (bunId) {
        state.list = [bunId, ...ingredientsId, bunId];
      }
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
      state.ingredientCounts = {};
      state.list = [];
      state.orderRequest = false;
      state.error = false;
      updateList(state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = false;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.orderRequest = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
        state.error = true;
      });
  },
  selectors: {
    bunSelector: (state) => state.bun,
    ingredientsSelector: (state) => state.ingredients,
    getConstructor: (state) => state.list,
    orderRequestSelector: (state) => state.orderRequest,
    ingredientCountsSelector: (state) => state.ingredientCounts
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveDownIngredient,
  moveUpIngredient
} = burgerConstructorSlice.actions;

export const {
  bunSelector,
  ingredientsSelector,
  getConstructor,
  orderRequestSelector,
  ingredientCountsSelector
} = burgerConstructorSlice.selectors;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
