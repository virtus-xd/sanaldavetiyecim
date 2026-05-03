/**
 * Sipariş formu — Adım 4: Özet ve onay.
 */
import { useFormContext } from 'react-hook-form';
import { formatDate, formatPrice } from '@/lib/utils';
import { EVENT_TYPES, BANK_ACCOUNTS, CAMPAIGN } from '@/lib/constants';
import { useTemplates } from '@/hooks/useTemplates';
import type { OrderFormValues } from '@/lib/validations';

interface SummaryRowProps {
  label:    string;
  value:    string | React.ReactNode;
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex justify-between gap-4 py-2.5 border-b border-neutral-100 last:border-0">
      <span className="text-sm text-neutral-500 shrink-0">{label}</span>
      <span className="text-sm font-medium text-neutral-800 text-right">{value}</span>
    </div>
  );
}

export function Step4Summary() {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<OrderFormValues>();

  const values              = watch();
  const { templates }       = useTemplates();
  const template            = templates.find((t) => t.id === values.templateId);
  const price               = template?.price ?? 199;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display text-xl font-semibold text-neutral-800">
        Sipariş Özeti
      </h2>

      {/* Organizasyon */}
      <div className="bg-neutral-50 rounded-xl p-4">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
          Organizasyon Bilgileri
        </p>
        <SummaryRow label="Tür"      value={EVENT_TYPES[values.eventType] ?? '-'} />
        <SummaryRow label="Çift"     value={`${values.groomName} & ${values.brideName}`} />
        <SummaryRow label="Tarih"    value={values.eventDate ? formatDate(values.eventDate) : '-'} />
        <SummaryRow label="Saat"     value={values.eventTime || '-'} />
        <SummaryRow label="Mekan"    value={values.eventVenue || '-'} />
        <SummaryRow label="Adres"    value={values.eventLocation || '-'} />
      </div>

      {/* Tasarım */}
      <div className="bg-neutral-50 rounded-xl p-4">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
          Tasarım Tercihi
        </p>
        <SummaryRow
          label="Tasarım"
          value={template ? template.name : 'Özel tasarım (siz karar verin)'}
        />
        {values.customMessage && (
          <SummaryRow label="Özel Mesaj" value={values.customMessage} />
        )}
      </div>

      {/* İletişim */}
      <div className="bg-neutral-50 rounded-xl p-4">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
          İletişim Bilgileri
        </p>
        <SummaryRow label="Ad Soyad" value={values.customerName || '-'} />
        <SummaryRow label="E-posta"  value={values.customerEmail || '-'} />
        <SummaryRow label="Telefon"  value={values.customerPhone || '-'} />
      </div>

      {/* Fiyat */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
        {CAMPAIGN.enabled && CAMPAIGN.originalPrice > price && (
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-neutral-500">Liste fiyatı</span>
            <span className="text-neutral-400 line-through">{formatPrice(CAMPAIGN.originalPrice)}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-neutral-700">Toplam Tutar</span>
          <span className="font-display text-2xl font-bold text-primary">
            ₺{price.toLocaleString('tr-TR')}
          </span>
        </div>
        {CAMPAIGN.enabled && CAMPAIGN.originalPrice > price && (
          <p className="mt-2 text-xs text-primary font-medium">
            {CAMPAIGN.label} — {formatPrice(CAMPAIGN.originalPrice - price)} tasarruf
          </p>
        )}
      </div>

      {/* Ödeme Talimatları */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-3">
          Ödeme Bilgileri
        </p>
        <p className="text-sm text-amber-800 mb-3">
          Siparişinizi onayladıktan sonra aşağıdaki hesaba havale/EFT yapmanız gerekmektedir.
          Açıklama kısmına <strong>sipariş numaranızı</strong> yazmayı unutmayın.
        </p>
        {BANK_ACCOUNTS.map((account) => (
          <div key={account.iban} className="bg-white rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-neutral-500">Banka</span>
              <span className="font-medium text-neutral-800">{account.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Hesap Sahibi</span>
              <span className="font-medium text-neutral-800">{account.accountHolder}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">IBAN</span>
              <span className="font-mono text-xs font-medium text-neutral-800">{account.iban}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Onay checkbox */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary cursor-pointer"
          {...register('termsAccepted')}
        />
        <span className="text-sm text-neutral-600 leading-relaxed">
          Sipariş koşullarını ve{' '}
          <a href="/sikca-sorulan-sorular" target="_blank" className="text-primary underline hover:no-underline">
            gizlilik politikasını
          </a>{' '}
          okudum, kabul ediyorum.
        </span>
      </label>
      {errors.termsAccepted && (
        <p className="text-xs text-red-500 -mt-3" role="alert">
          {errors.termsAccepted.message}
        </p>
      )}
    </div>
  );
}
