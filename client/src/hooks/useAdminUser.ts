import { useState, useEffect } from "react";

interface User {
  id: number;
  username: string;
  isAdmin: boolean;
  email?: string | null;
  fullName?: string | null;
}

export default function useAdminUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/user");

        if (response.status === 401) {
          // Not authenticated
          setUser(null);
          return;
        }

        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.status}`);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading, error, isAdmin: user?.isAdmin || false };
}
