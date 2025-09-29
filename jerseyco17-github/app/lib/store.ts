import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, FilterOptions } from '@/app/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  filters: FilterOptions;
  searchQuery: string;
  isLoading: boolean;
  setProducts: (products: Product[]) => void;
  setFilters: (filters: FilterOptions) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  applyFilters: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const existingItem = get().items.find(
          (i) => i.product.id === item.product.id && 
                 i.selectedSize === item.selectedSize && 
                 i.selectedColor === item.selectedColor
        );
        
        if (existingItem) {
          set((state) => ({
            items: state.items.map((i) =>
              i.product.id === item.product.id && 
              i.selectedSize === item.selectedSize && 
              i.selectedColor === item.selectedColor
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          }));
        } else {
          set((state) => ({ items: [...state.items, item] }));
        }
      },
      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (item) => 
              !(item.product.id === productId && 
                item.selectedSize === size && 
                item.selectedColor === color)
          ),
        }));
      },
      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && 
            item.selectedSize === size && 
            item.selectedColor === color
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => 
        get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  filters: {},
  searchQuery: '',
  isLoading: false,
  setProducts: (products) => set({ products, filteredProducts: products }),
  setFilters: (filters) => set({ filters }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (loading) => set({ isLoading: loading }),
  applyFilters: () => {
    const { products, filters, searchQuery } = get();
    let filtered = [...products];

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    // Apply brand filter
    if (filters.brand && filters.brand.length > 0) {
      filtered = filtered.filter((product) => filters.brand!.includes(product.brand));
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter((product) => product.price >= min && product.price <= max);
    }

    // Apply size filter
    if (filters.sizes && filters.sizes.length > 0) {
      filtered = filtered.filter((product) =>
        filters.sizes!.some(size => product.sizes.includes(size))
      );
    }

    // Apply color filter
    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter((product) =>
        filters.colors!.some(color => product.colors.includes(color))
      );
    }

    // Apply stock filter
    if (filters.inStock !== undefined) {
      filtered = filtered.filter((product) => product.inStock === filters.inStock);
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter((product) => product.rating >= filters.rating!);
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (filters.sortBy) {
          case 'name':
            aValue = a.name;
            bValue = b.name;
            break;
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'rating':
            aValue = a.rating;
            bValue = b.rating;
            break;
          case 'newest':
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
            break;
          case 'popularity':
            aValue = a.reviewCount;
            bValue = b.reviewCount;
            break;
          default:
            return 0;
        }

        if (filters.sortOrder === 'desc') {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        } else {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        }
      });
    }

    set({ filteredProducts: filtered });
  },
}));
