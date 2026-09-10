import { useLocalSearchParams } from 'expo-router';
import { RecipeDetailScreen } from '../../src/screens/RecipeDetailScreen';

export default function RecipeRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <RecipeDetailScreen recipeId={id} />;
}
