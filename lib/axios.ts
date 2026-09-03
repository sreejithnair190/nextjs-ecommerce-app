import axios from 'axios';
import { toast } from 'sonner';

// Keep track of active toasts
const activeToasts = new Map<string, string | number>();

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, 
});

api.interceptors.request.use(
  (config) => {
    // Internet connectivity check
    if (typeof window !== "undefined" && !navigator.onLine) {
      toast.error("No internet connection. Please check your network and try again.");
      return Promise.reject(new Error("No internet connection"));
    }

    // Determine loading message or default
    const loadingMessage = (config as any).loadingMessage || 'Loading...';
    
    // Default GET requests to not show loading toast unless explicitly requested
    const isGet = config.method?.toLowerCase() === 'get';
    const shouldShowLoading = (config as any).showLoadingToast ?? !isGet;

    // Show loading toast (skip if explicitly disabled)
    if (shouldShowLoading) {
      // Create a unique ID for this request's toast
      const requestId = config.url + '-' + Date.now();
      (config as any).requestId = requestId;
      
      const toastId = toast.loading(loadingMessage);
      activeToasts.set(requestId, toastId);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const requestId = (response.config as any).requestId;
    const toastId = activeToasts.get(requestId);
    
    if (toastId) {
      toast.dismiss(toastId);
      activeToasts.delete(requestId);
    }

    // Success toast
    const isGet = response.config.method?.toLowerCase() === 'get';
    const shouldShowSuccess = (response.config as any).showSuccessToast ?? !isGet;
    
    if (shouldShowSuccess && response.data?.message) {
      toast.success(response.data.message);
    }

    return response;
  },
  (error) => {
    const requestId = error.config ? (error.config as any).requestId : null;
    const toastId = requestId ? activeToasts.get(requestId) : undefined;
    
    if (toastId) {
      toast.dismiss(toastId);
      activeToasts.delete(requestId);
    }

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    // Prevent showing errors if we already intercepted the offline error
    if (error.message === "No internet connection") {
      return Promise.reject(error);
    }

    const errorMessage = 
      error.response?.data?.message || 
      error.message || 
      "Something went wrong";

    if ((error.config as any)?.showErrorToast !== false) {
      if (error.code === 'ECONNABORTED') {
        toast.error("Request timed out. Please try again.");
      } else {
        toast.error(errorMessage);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
