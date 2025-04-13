import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, setIngredients } from '../../slices/ingredientsSlice';
import { useLocation } from 'react-router-dom';
import { AppDispatch } from 'src/services/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const ingredientId = location.pathname.split('/').pop();
  const ingredients = useSelector(setIngredients);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === ingredientId
  );

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
