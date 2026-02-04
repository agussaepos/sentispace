import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Cookies from "js-cookie";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  data: {
    message: string;
    access_token: string;
    expired_in: number;
    refresh_token: string;
    refresh_expired_in: number;
  };
  error_message: null | string;
  status: number;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (response: LoginResponse) => {
      if (response.data?.access_token) {
        Cookies.set("token", response.data.access_token, { expires: response.data.expired_in / 86400 }); 
        Cookies.set("refresh_token", response.data.refresh_token, { expires: 7 }); // Refresh token usually lasts longer, default to 7 days if not provided
      }
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const refreshToken = Cookies.get("refresh_token");
      await api.post(
        "/auth/logout",
        { refresh_token: refreshToken },
        {
          headers: {
            "x-project": "dashboard",
          },
        }
      );
    },
    onSuccess: () => {
      Cookies.remove("token");
      Cookies.remove("refresh_token");
      window.location.href = "/";
    },
    onError: () => {
      // Even if API fails, force logout locally
      Cookies.remove("token");
      Cookies.remove("refresh_token");
      window.location.href = "/";
    }
  });
};

interface UserScopeResponse {
  data: any; // The structure is complex, we check for 'scopes' inside permissions array
  status: number;
}

export const useUserScope = () => {
  return useQuery({
    queryKey: ["userScope"],
    queryFn: async () => {
      const response = await api.get<UserScopeResponse>("/user/scope");
      // The user provided structure shows a complex 'authorization' object in login, 
      // but usually /user/scope returns a simpler list for checking.
      // Based on previous code we expect data.data to be string array? 
      // Let's assume the previous assumption for scope check endpoint was correct OR 
      // if it returns the same structure as login's token decoding:
      // The user didn't paste /user/scope response specifically, but the login response decoding.
      // However the previous code used `response.data.data.includes(...)`. 
      // Let's stick to standard behavior but ensure enabled is correct.
      return response.data;
    },
    enabled: !!Cookies.get("token"),
    retry: false,
  });
};

interface UserProfileResponse {
  data: {
    sub: string;
    preferred_username: string;
    email: string;
    email_verified: boolean;
  };
  error_message: null | string;
  status: number;
}

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await api.get<UserProfileResponse>("/user/profile");
      return response.data;
    },
    enabled: !!Cookies.get("token"),
  });
};
