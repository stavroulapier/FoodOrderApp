import { useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const fetchMeals = async () => {
    const response = await fetch(
      'https://react-http-6d16f-default-rtdb.firebaseio.com/meals.json'
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const responseData = await response.json();
    const loadedMeals = Object.keys(responseData).map((mealKey) => {
      return {
        id: mealKey,
        name: responseData[mealKey].name,
        description: responseData[mealKey.description],
        price: responseData[mealKey].price,
      };
    });
    setMeals(loadedMeals);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeals()
      .then()
      .catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p className={classes.mealsError}>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => <MealItem key={meal.id} meal={meal} />);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
