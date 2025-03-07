export const anyStatus = ['Active' , 'Inactive']
export const anyPriority = ['High, Medium', 'Low']

export type Transaction = {
   id: number;
   documentId: number | null;
   amount: number;
   description: string;
   currency: string;
   transaction_date: string;
   payment_type: string;
   creditor_code: string;
   creditor_account: string;
   creditor_iban: string | null;
   creditor_name: string;
   debitor_code: string;
   debitor_account: string;
   debitor_iban: string | null;
   debitor_name: string;
   is_approved: boolean;
   trx_id: string;
   fee_epay: number;
   fee_bom: number;
   fee_creditor: number;
   fee_debitor: number;
   createdAt: string;
   updatedAt: string;
   publishedAt: string | null;
   bom_id: number | null;
   qpay_id: string;
}

export type TransactionListApiResponse = {
    data: Transaction[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    }
}