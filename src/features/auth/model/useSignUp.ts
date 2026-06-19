import { useCallback, useState } from 'react';

import { useAuthStore } from '@/entities/session/useAuthStore';
import { RegisterPayload } from '@/entities/user/modal/type'; 

import { registerUserApi } from '../api/registerUser';

interface UseSignUpProps {
  onSuccess?: () => void;
}

export const useSignUp = ({ onSuccess }: UseSignUpProps = {}) => {
  const initialForm: RegisterPayload = {
    name: '',
    lastName: '',
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState<RegisterPayload>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setToken = useAuthStore((state) => state.setToken);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic Validation
// Basic Validation
    if (!formData.email.includes('@')) {
      return setError('Invalid email address.');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await registerUserApi(formData);
      
      // 🚀 اصلاح شد: استفاده از علامت ?. و نام دقیق accesstoken
      const token = response.data?.accesstoken; 

        if (!token) {
        throw new Error('System is currently unable to issue a token.');
      }

      // ذخیره توکن در استور
      setToken(token);
      onSuccess?.();
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const apiError = err?.response?.data?.message || err.message;
        setError(apiError || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSignUp,
    resetForm: () => setFormData(initialForm)
  };
};
