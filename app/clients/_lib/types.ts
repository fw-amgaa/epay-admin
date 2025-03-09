export const anyStatus = ['Active' , 'Inactive']
export const anyPriority = ['High, Medium', 'Low']

export type ApiKey = {
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string | null;
    status: boolean;
    id: number;
    key: string;
}

export type Client = {
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string | null;
    status: boolean;
    id: string;
    code: string;
    bic: string;
    name: string;
    name_en: string;
    logo: string | null;
    website: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    api_url: string;
    api_keys: ApiKey[];
}