import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./features/favorites/favoritesSlice";

// Load favorites from localStorage
const storedFavorites = localStorage.getItem("favorites");
let initialFavorites = [];

if (storedFavorites) {
  try {
    const parsedData = JSON.parse(storedFavorites);
    if (Array.isArray(parsedData?.favorites?.favorites)) {
      initialFavorites = parsedData.favorites.favorites;
    }
  } catch (error) {
    console.error("Error parsing favorites from localStorage:", error);
  }
}

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: { favorites: initialFavorites },
  },
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  try {
    localStorage.setItem("favorites", JSON.stringify(store.getState()));
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error);
  }
});
