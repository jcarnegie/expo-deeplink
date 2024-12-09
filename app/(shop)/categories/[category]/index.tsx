import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function CategoryScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();

  const sampleProducts = [1, 2, 3];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Products</Text>
      {sampleProducts.map((id) => (
        <Pressable
          key={id}
          style={styles.productButton}
          onPress={() => router.push(`/categories/${category}/${id}`)}
        >
          <Text style={styles.buttonText}>View Product {id}</Text>
        </Pressable>
      ))}
      <Text style={styles.description}>
        Deep link format:{'\n'}
        rhino://categories/{category}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
