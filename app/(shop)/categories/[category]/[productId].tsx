import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ProductDetailScreen() {
  const { category, color, productId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.category}>Category: {category}</Text>
      <Text style={styles.productId}>Product ID: {productId}</Text>
      <Text style={styles.productId}>Color: {color}</Text>
      <Text style={styles.description}>
        This is a nested route accessed via deep linking!{'\n\n'}
        Try these deep link formats:{'\n'}
        • rhino://categories/electronics/123{'\n'}
        • exp://YOUR-EXPO-URL/categories/electronics/123
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
  category: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  productId: {
    fontSize: 18,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
});
