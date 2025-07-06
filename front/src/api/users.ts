import type { IUser } from '../types/interfaces';

export class Users {
    static async register(email: string, password: string, age: number | null) {
        const res = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password, age: age }),
        });
        return await res.json();
    }

    static async login(email: string, password: string) {
        const res = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
        });
        return await res.json();
    }

    static async refresh(refreshToken: string) {
        const res = await fetch('http://localhost:3001/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: refreshToken }),
        });
        return await res.json();
    }

    static async getMe(assetsToken: string): Promise<IUser> {
        const res = await fetch('http://localhost:3001/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${assetsToken}`,
            },
        });
        return await res.json();
    }

    static async changePassword(assetsToken: string, oldPassword: string, newPassword: string) {
        const res = await fetch('http://localhost:3001/auth/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${assetsToken}`,
            },
            body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword }),
        });
        return await res.json();
    }
}
