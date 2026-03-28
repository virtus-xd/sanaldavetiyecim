import { Resend } from 'resend';

export const getResend = () => new Resend(process.env.RESEND_API_KEY);

export const FROM_ADDRESS = 'Sanal Davetiye <noreply@sanaldavetiyecim.com>';
export const ADMIN_EMAIL  = process.env.ADMIN_EMAIL ?? 'admin@sanaldavetiyecim.com';
