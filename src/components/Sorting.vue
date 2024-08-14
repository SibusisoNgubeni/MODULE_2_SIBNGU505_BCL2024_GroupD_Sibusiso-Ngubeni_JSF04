<script setup>
  import { ref, defineEmits } from 'vue';
    /**
   * Event dispatcher for emitting events to parent components.
   */
  const emit =  defineEmits(['sortChange', 'reset']);

    /** 
   * The currently selected sort option.
   * @type {string}
   */
  const sortOption = ref('');


   /**
   * Handles changes in the sort option dropdown selection.
   * Dispatches a 'sortChange' event with the selected sort option.
   */

   
  function handleSortChange(event) {
      sortOption.value = event.target.value;

      //changed sortOption.value to e.target.value
      emit('sortChange', event.target.value);
  }

  function handleReset() {
      emit('reset');
  }
</script>


<template>
    <div class="sort">
       <select class="sort-select" @change="handleSortChange">
         <option value="">Sort by Price</option>
         <option value="asc">Price: Low to High</option>
         <option value="desc">Price: High to Low</option>
       </select>
       <button class="reset-btn" @click="handleReset">Reset</button>
    </div>
</template>

<style scoped>
  .sort-select {
    height: 30px;
    width: 200px;
    margin-left: auto; 
    margin-right: 10px; 
    margin-top: 20px;
    background-color: rgb(66, 75, 86);
    border-radius: 5px;
    align-items: center; 
    justify-content: center; 
    font-weight: bold;
    color: #efe8e8;
  }

  .reset-btn{
    margin: 5px;
    margin-left: 0px;
    border-radius: 5px;
    height: 30px;
    background-color: rgb(66, 75, 86);
    font-weight: bold;
    color: #efe8e8;
        
    }

  @media (max-width: 1200px) {
  .sort {
    width: 90%; 
    margin-left: 0;
    
    }
  .reset-btn{
    margin: 5px;
    margin-left: 0px;
    border-radius: 5px;
    }
  }

  @media (max-width: 992px) {
   .sort {
    width: 90%; 
    margin-left: 0;
    }
   .reset-btn{
    margin: 5px;
    margin-left: 0px;
    border-radius: 5px;
    }
  }

  @media (max-width: 768px) {
   .sort {
    width: 90%; 
    margin-left: 5px; 
    margin-right: 10px;
    }
   .reset-btn{
    margin: 5px;
    margin-left: 0px;
    border-radius: 5px;
    }
  }
</style>
