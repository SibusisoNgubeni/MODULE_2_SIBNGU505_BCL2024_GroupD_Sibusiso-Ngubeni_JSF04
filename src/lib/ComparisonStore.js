import { ref, watch } from 'vue';

const comparisonList = ref(JSON.parse(localStorage.getItem('comparisonList') || '[]'));

export const useComparisonStore = () => {
  const addToComparison = (product) => {
    if (comparisonList.value.length >= 4) {
      alert('You can only compare up to 4 items at a time.');
      return;
    }

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

  
  watch(comparisonList, (newList) => {
    localStorage.setItem('comparisonList', JSON.stringify(newList));
  }, { deep: true });

  return {
    comparisonList,
    addToComparison,
    removeFromComparison,
    clearComparison,
  };
};
