import { apiClient } from "@/config/axiosConfig"
import { UserType, BaseApiReponse } from "@/types/globalTypes"


export const login = async (email: string, senha: string) => {
    return await apiClient.post<{ email: string, senha: string }, BaseApiReponse<UserType & { token: string }>>('/api/auth/login', { email, senha })
} 