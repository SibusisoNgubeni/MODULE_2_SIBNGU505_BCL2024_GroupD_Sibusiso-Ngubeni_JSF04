import { ref } from 'vue';

export const useComparisonStore = () => {
  const comparisonList = ref([]);

  const addToComparison = (product) => {
    const exists = comparisonList.value.some(item => item.id === product.id);
    if (!exists) {
      comparisonList.value.push(product);
      alert(`${product.title} has been added to your comparison list.`);
    } else {
      alert(`${product.title} is already in your comparison list.`);
    }
  };

  return {
    comparisonList,
    addToComparison
  };
};

