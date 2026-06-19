import axios from 'axios';

import { RegisterPayload,RegisterResponse} from '@/entities/user/modal/type';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * درخواست ثبت‌نام کاربر جدید
 */
export const registerUserApi = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${API_BASE_URL}/auth/register`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    // هندل کردن خطاهای Axios به صورت استاندارد
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'خطایی در ارتباط با سرور رخ داد';
      throw new Error(errorMessage);
    }
    throw new Error('خطای ناشناخته در ثبت‌نام');
  }
};
