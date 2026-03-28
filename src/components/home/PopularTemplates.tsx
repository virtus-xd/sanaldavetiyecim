'use client';

/**
 * Popüler tasarımlar bölümü — props ile gelen şablonları gösterir.
 */
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Template } from '@/types';
import { EVENT_TYPES, TEMPLATE_STYLES } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useScrollAnimation, staggerContainerVariants, fadeUpVariants } from '@/hooks/useScrollAnimation';

interface PopularTemplatesProps {
  templates: Template[];
}

export function PopularTemplates({ templates }: PopularTemplatesProps) {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-cream" aria-label="Popüler Tasarımlar">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionTitle
            title="Popüler Tasarımlar"
            subtitle="En çok tercih edilen davetiye tasarımlarımıza göz atın."
            align="left"
            className="max-w-lg"
          />
          <Button asChild variant="outline" size="md" className="shrink-0 self-start md:self-auto">
            <Link href="/tasarimlar" className="flex items-center gap-2">
              Tüm Tasarımları Gör
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {templates.map((template) => (
            <motion.article
              key={template.id}
              variants={fadeUpVariants}
              className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              {/* Görsel */}
              <div className="relative h-52 overflow-hidden bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={template.previewImages[0]}
                  alt={`${template.name} davetiye önizlemesi`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    href={`/tasarimlar/${template.slug}`}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-neutral-800 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    <Eye size={15} aria-hidden="true" />
                    İncele
                  </Link>
                </div>
              </div>

              {/* İçerik */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-display font-semibold text-neutral-800 text-base leading-tight">
                    {template.name}
                  </h3>
                  <span className="font-semibold text-primary text-sm shrink-0">
                    {formatPrice(template.price)}
                  </span>
                </div>

                <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {template.description}
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="primary">
                    {EVENT_TYPES[template.category]}
                  </Badge>
                  <Badge variant="neutral">
                    {TEMPLATE_STYLES[template.style]}
                  </Badge>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
