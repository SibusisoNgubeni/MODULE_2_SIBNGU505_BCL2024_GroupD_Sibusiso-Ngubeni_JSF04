# Vue 3 eCommerce store

##Deployment link
https://vercel.com/sibusisongubenis-projects/sibusisongubenivueproject/73Rym5fyhG6h7uNu3EBEEv9Dqn16

## Overview
This project is a Vue.js application designed to showcase product listing and product detail view. It includes features such as category filters, sorting options, and a responsive design. The application uses Vue Router for navigation and state management for persisting filters and user selections.

## Features
1. Product Listing: Displays a list of products with filtering by product category and high-low/ low-high sorting options.
2. Product Detail View: Shows detailed information about a selected product.
3. Responsive Design: Adapts layout for various device sizes using media queries.
4. Persistent Filters: Maintains filter settings across navigation and page refreshes.


##Usage
users can browse products, see product details on a detailed view page and add items to wishlist, comparison list and cart, upon clicking on either to view items in the comparison list, user is prompted 
to log in as comparison page, cart and wishlist are protected routes

user login details:
username: mor_2314
Password: 83r5^_


## Technologies Used
 ### Vue.js:
 JavaScript framework for building the user interface.
 ### Vue Router: 
 Routing library for navigating between different views.
 ### Scoped CSS:
For component-specific styling.
 ### Vue Composition API:
For state management and reactivity.

## Routing and Navigation
The project utilizes Vue Router for managing navigation between different views. Key points of implementation include:

 ### Dynamic Routing: 
 Configured to handle dynamic segments, such as product IDs in the detail view.
 ### Query Parameters: 
 Used for persisting filters and sort options across navigation and page refreshes.

## Challenges and Learning
1. ### Dynamic Routing
 ### Challenge: 
 Configuring routes to handle dynamic segments like product IDs and ensuring the correct product details are displayed.
 ### Solution: 
 Implemented dynamic routing in router/index.js using route parameters.

2. ### Persistent Filters
 ### Challenge: 
 Persistent filters that would maintain their state across page reloads and navigations. The goal was to ensure that users' filter selections (e.g., category and sort options) persist when they navigate between pages or refresh the page, without relying on server-side storage or local storage.

 ### Solution: 
 To achieve persistent filters without using local storage or server-side storage, i leveraged Vue's reactive state management and Vue Router.

 ### Reactive State Management
 I used a Vue composable to manage the filter state reactively. The ProductStore manages the state for filters:
 ```
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
```

### Key Components:

### state: 
Holds the reactive state for filters.
### setCategory and setSortOption: 
Methods to update the state.
### resetFilters: 
Method to reset filters.
### getCategory and getSortOption: 
Computed properties to access current filter values.

By integrating Vue's reactive state management i successfully created a persistent filter system that maintains user selections across navigations and page refreshes.

## Responsive Design
Implemented media queries to ensure the application layout adapts to various screen sizes:
```
@media (max-width: 1200px) {
  .category-filter {
    width: 120px;
    height: 35px;
  }

  .selector {
    width: 120px;
  }
}

@media (max-width: 768px) {
  .category-filter {
    width: 80px;
    height: 25px;
  }

  .selector {
    width: 80px;
  }
}

@media (max-width: 480px) {
  .category-filter,
  .selector {
    width: 100%;
    margin-left: 0;
  }
}
```
This responsive design ensures the application remains user-friendly across different devices and screen sizes.


## Reflections
 ### Development Process
 Building this Vue 3 eCommerce store has been an enriching experience, allowing me to apply and deepen my understanding of Vue.js, Vue Router, and state management. The project began with the goal of creating a functional eCommerce application with features like product listings, filtering, sorting, and responsive design. Each aspect of the development presented unique challenges and opportunities for growth.

## Challenges and Solutions
### Dynamic Routing:

### Challenge: 
Configuring Vue Router to handle dynamic segments, such as product IDs, and ensuring the correct product details are displayed.
### Solution:
Implemented dynamic routing using route parameters. This allowed for accurate navigation to product detail views based on the product ID included in the URL. 

### Challenge: 
Maintaining filter state across page reloads and navigations without relying on local storage or server-side solutions.
### Solution: 
Utilized Vue’s reactive state management to persist filter settings. By leveraging reactive state in a Vue composable and synchronizing it with the query parameters in the URL, the application ensures that user selections persist seamlessly. This approach avoided the complexity of local storage or server-side interactions and provided a clean solution for filter persistence.

## Lessons Learned
### Vue Router Integration:
Learning how to configure and use Vue Router effectively was crucial. Understanding how to handle dynamic segments and query parameters enriched my knowledge of routing and improved the overall user experience by enabling smooth navigation and state persistence.

### Reactive State Management:
Implementing Vue’s reactive state management demonstrated its power in managing and persisting application state. It was a practical exercise in understanding reactivity and how it can be utilized to create a more seamless and intuitive user experience.
