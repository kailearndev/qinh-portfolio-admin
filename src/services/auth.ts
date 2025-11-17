import { supabase } from "@/lib/supbase";

const login = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;

    }
}
const logout = async () => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error;
        }
    } catch (error) {
        throw error;
    }
}

export const authService = {
    login,
    logout,
};