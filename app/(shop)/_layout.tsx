import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'categories/index',
};

export default function ShopLayout() {
  return (
    <Stack
      initialRouteName="categories/[category]/index"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4f4f4',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="categories/[category]/index"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="categories/[category]/[productId]"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
