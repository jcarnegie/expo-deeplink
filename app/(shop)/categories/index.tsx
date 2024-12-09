import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function CategoriesScreen() {
  const router = useRouter();

  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'books', name: 'Books' },
    { id: 'sports', name: 'Sports' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={styles.categoryButton}
            onPress={() => router.push(`/categories/${category.id}`)}
          >
            <Text style={styles.buttonText}>{category.name}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.description}>
        Try deep linking to a category:{'\n'}
        rhino://categories/electronics{'\n\n'}
        Or directly to a product:{'\n'}
        rhino://categories/electronics/123
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoriesContainer: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  categoryButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    lineHeight: 24,
  },
});