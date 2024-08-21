import { ref } from 'vue';

const comparisonList = ref([]);

export const useComparisonStore = () => {

  const addToComparison = (product) => {
    if (!comparisonList.value.some(item => item.id === product.id)) {
      comparisonList.value.push(product);
      alert(`${product.title} has been added to your comparison list.`);
    } else {
      alert(`${product.title} is already in your comparison list.`);
    }
  };

  const removeFromComparison = (productId) => {
    comparisonList.value = comparisonList.value.filter(item => item.id !== productId);
  };

  const clearComparison = () => {
    comparisonList.value = [];
  };

  return {
    comparisonList,
    addToComparison,
    removeFromComparison,
    clearComparison,
  };
};
