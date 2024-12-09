import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ProductScreen() {
  // Get the id parameter from the URL
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Details</Text>
      <Text style={styles.productId}>Product ID: {id}</Text>
      <Text style={styles.description}>
        This screen was accessed via deep linking! Try opening this app with the URL:
        {'\n\n'}
        exp://YOUR_EXPO_URL/product/123
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
  productId: {
    fontSize: 18,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
