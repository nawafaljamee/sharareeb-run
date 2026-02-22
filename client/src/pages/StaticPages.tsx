import { useStore } from "@/store/use-store";

const Wrapper = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="pt-32 pb-24 min-h-screen bg-background">
    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-black mb-12">{title}</h1>
      <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-p:text-muted-foreground prose-a:text-primary">
        {children}
      </div>
    </div>
  </div>
);

export function About() {
  const { t } = useStore();
  return (
    <Wrapper title={t('section.story')}>
      <p className="text-xl leading-relaxed whitespace-pre-wrap">
        {t('content.story')}
      </p>
      <div className="mt-16 p-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl not-prose">
        <h2 className="text-2xl font-black mb-4 uppercase">{t('section.mission')}</h2>
        <p className="text-lg text-muted-foreground">
          {t('content.mission')}
        </p>
      </div>
    </Wrapper>
  );
}

export function Shipping() {
  const { lang, t } = useStore();
  return (
    <Wrapper title={t('nav.shipping')}>
      {lang === 'ar' ? (
        <>
          <h2>سياسة الشحن</h2>
          <ul>
            <li><strong>داخل الرياض:</strong> التوصيل خلال 24 ساعة للطلبات المؤكدة قبل الساعة 4 مساءً.</li>
            <li><strong>باقي مدن المملكة:</strong> التوصيل خلال 2 إلى 3 أيام عمل عبر شركاء الشحن المعتمدين.</li>
            <li>رسوم الشحن تضاف بناءً على منطقتك وسيتم توضيحها لك عبر الواتساب قبل تأكيد الطلب.</li>
          </ul>
          <h2>سياسة الاسترجاع</h2>
          <p>نظراً لطبيعة المنتج (ملابس داخلية/جوارب)، ولضمان صحة وسلامة عملائنا، لا نقبل الاسترجاع أو الاستبدال إلا في الحالات التالية:</p>
          <ul>
            <li>استلام منتج خاطئ غير الذي تم طلبه.</li>
            <li>وجود عيب مصنعي في المنتج.</li>
          </ul>
          <p>يجب الإبلاغ عن المشكلة خلال 3 أيام من استلام الطلب، ويجب أن يكون المنتج في حالته الأصلية وتغليفه مغلق.</p>
        </>
      ) : (
        <>
           <h2>Shipping Policy</h2>
          <ul>
            <li><strong>Within Riyadh:</strong> Delivery within 24 hours for orders confirmed before 4 PM.</li>
            <li><strong>Other KSA Cities:</strong> Delivery within 2 to 3 working days via certified shipping partners.</li>
            <li>Shipping fees are calculated based on your region and will be clarified via WhatsApp before order confirmation.</li>
          </ul>
          <h2>Return Policy</h2>
          <p>Due to the nature of the product (underwear/socks), and to ensure the health and safety of our customers, we only accept returns or exchanges in the following cases:</p>
          <ul>
            <li>Receiving the wrong product.</li>
            <li>Manufacturing defect in the product.</li>
          </ul>
          <p>The issue must be reported within 3 days of receiving the order, and the product must be in its original, unopened packaging.</p>
        </>
      )}
    </Wrapper>
  );
}

export function Contact() {
  const { lang, t } = useStore();
  return (
    <Wrapper title={t('nav.contact')}>
      {lang === 'ar' ? (
        <>
          <p>نسعد دائماً بتواصلكم معنا والإجابة على كافة استفساراتكم.</p>
          <div className="bg-muted p-8 rounded-2xl not-prose mt-8">
            <h3 className="text-xl font-bold mb-4">معلومات التواصل</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><strong>البريد الإلكتروني:</strong> hello@sharareeb-run.com</li>
              <li><strong>واتساب:</strong> +966 50 000 0000</li>
              <li><strong>أوقات العمل:</strong> الأحد إلى الخميس، من 9 صباحاً حتى 6 مساءً.</li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <p>We are always happy to connect with you and answer all your inquiries.</p>
          <div className="bg-muted p-8 rounded-2xl not-prose mt-8">
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><strong>Email:</strong> hello@sharareeb-run.com</li>
              <li><strong>WhatsApp:</strong> +966 50 000 0000</li>
              <li><strong>Working Hours:</strong> Sunday to Thursday, 9 AM to 6 PM.</li>
            </ul>
          </div>
        </>
      )}
    </Wrapper>
  );
}
