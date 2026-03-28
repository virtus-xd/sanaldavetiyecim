/**
 * Zod validasyon şemaları — tüm formlar için.
 */
import { z } from 'zod';

// ─── Sipariş Formu ─────────────────────────────────────────────────────────────

export const step1Schema = z.object({
  eventType:     z.enum(['dugun', 'soz', 'nisan', 'kina', 'ozel'], {
    error: 'Organizasyon türü seçiniz',
  }),
  groomName:     z.string().min(2, 'Damat/erkek adı en az 2 karakter olmalıdır'),
  brideName:     z.string().min(2, 'Gelin/kadın adı en az 2 karakter olmalıdır'),
  eventDate:     z.string().min(1, 'Etkinlik tarihi giriniz'),
  eventTime:     z.string().min(1, 'Etkinlik saati giriniz'),
  eventVenue:    z.string().min(2, 'Mekan adı en az 2 karakter olmalıdır'),
  eventLocation: z.string().min(5, 'Mekan adresi/konumu en az 5 karakter olmalıdır'),
});

export const step2Schema = z.object({
  templateId:      z.string().nullable(),
  customMessage:   z.string().max(500, 'Özel mesaj en fazla 500 karakter olabilir'),
  additionalNotes: z.string().max(300, 'Ek notlar en fazla 300 karakter olabilir'),
});

export const step3Schema = z.object({
  customerName:  z.string().min(3, 'Ad soyad en az 3 karakter olmalıdır'),
  customerEmail: z.string().email('Geçerli bir e-posta adresi giriniz'),
  customerPhone: z
    .string()
    .min(10, 'Geçerli bir telefon numarası giriniz')
    .regex(/^[0-9\s\+\-\(\)]+$/, 'Telefon numarası sadece rakam içermelidir'),
});

export const step4Schema = z.object({
  termsAccepted: z.boolean().refine((v) => v === true, {
    message: 'Sipariş vermek için koşulları kabul etmelisiniz',
  }),
});

export const orderFormSchema = z.object({
  // Adım 1
  eventType:       z.enum(['dugun', 'soz', 'nisan', 'kina', 'ozel'], { error: 'Organizasyon türü seçiniz' }),
  groomName:       z.string().min(2, 'Damat/erkek adı en az 2 karakter olmalıdır'),
  brideName:       z.string().min(2, 'Gelin/kadın adı en az 2 karakter olmalıdır'),
  eventDate:       z.string().min(1, 'Etkinlik tarihi giriniz'),
  eventTime:       z.string().min(1, 'Etkinlik saati giriniz'),
  eventVenue:      z.string().min(2, 'Mekan adı en az 2 karakter olmalıdır'),
  eventLocation:   z.string().min(5, 'Mekan adresi/konumu en az 5 karakter olmalıdır'),
  // Adım 2
  templateId:      z.string().nullable(),
  customMessage:   z.string().max(500, 'Özel mesaj en fazla 500 karakter olabilir'),
  additionalNotes: z.string().max(300, 'Ek notlar en fazla 300 karakter olabilir'),
  // Adım 3
  customerName:    z.string().min(3, 'Ad soyad en az 3 karakter olmalıdır'),
  customerEmail:   z.string().email('Geçerli bir e-posta adresi giriniz'),
  customerPhone:   z.string().min(10, 'Geçerli bir telefon numarası giriniz').regex(/^[0-9\s\+\-\(\)]+$/, 'Telefon numarası sadece rakam içermelidir'),
  // Adım 4
  termsAccepted:   z.boolean().refine((v) => v === true, { message: 'Sipariş vermek için koşulları kabul etmelisiniz' }),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
export type Step1Values     = z.infer<typeof step1Schema>;
export type Step2Values     = z.infer<typeof step2Schema>;
export type Step3Values     = z.infer<typeof step3Schema>;

// ─── İletişim Formu ────────────────────────────────────────────────────────────

export const contactFormSchema = z.object({
  name:    z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  email:   z.string().email('Geçerli bir e-posta giriniz'),
  phone:   z.string().optional(),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır').max(1000, 'Mesaj en fazla 1000 karakter olabilir'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// ─── Sipariş Sorgulama ─────────────────────────────────────────────────────────

export const orderQuerySchema = z.object({
  query: z.string().min(3, 'Sipariş numarası veya e-posta giriniz'),
});

export type OrderQueryValues = z.infer<typeof orderQuerySchema>;
