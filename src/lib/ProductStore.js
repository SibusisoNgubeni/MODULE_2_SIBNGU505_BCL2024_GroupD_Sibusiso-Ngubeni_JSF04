import { reactive, computed } from 'vue';

const state = reactive({
  currentCategory: '',
  sortOption: ''
});

const setCategory = (category) => {
  state.currentCategory = category;
};

const setSortOption = (option) => {
  state.sortOption = option;
};

const resetFilters = () => {
  state.currentCategory = '';
  state.sortOption = '';
};

const getCategory = computed(() => state.currentCategory);
const getSortOption = computed(() => state.sortOption);

export function ProductStore() {
  return {
    setCategory,
    setSortOption,
    resetFilters,
    getCategory,
    getSortOption
  };
}
