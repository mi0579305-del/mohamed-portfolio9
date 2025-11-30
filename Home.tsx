import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, CheckCircle, Clock, FileText, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const { data: visaTypes, isLoading } = trpc.visa.types.useQuery();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ت</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">مكتب التأشيرات</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-foreground hover:text-primary transition">
              الرئيسية
            </Link>
            <Link href="/services" className="text-foreground hover:text-primary transition">
              الخدمات
            </Link>
            <Link href="/pricing" className="text-foreground hover:text-primary transition">
              الأسعار
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              اتصل بنا
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-foreground">{user?.name}</span>
                <Link href="/dashboard">
                  <Button variant="default" size="sm">
                    لوحة التحكم
                  </Button>
                </Link>
              </>
            ) : (
              <a href={getLoginUrl()}>
                <Button variant="default" size="sm">
                  دخول
                </Button>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-l from-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              خدمات التأشيرات المتخصصة
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              نحن نقدم خدمات تأشيرات سفر موثوقة وسريعة للمملكة العربية السعودية. فريقنا المحترف يضمن معالجة طلبك بكفاءة واحترافية.
            </p>
            <div className="flex gap-4">
              {isAuthenticated ? (
                <Link href="/apply">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    قدم طلبك الآن
                  </Button>
                </Link>
              ) : (
                <a href={getLoginUrl()}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    ابدأ الآن
                  </Button>
                </a>
              )}
              <Button size="lg" variant="outline">
                تعرف على المزيد
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h3 className="text-3xl font-bold text-center mb-12">لماذا تختارنا؟</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>معالجة سريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  نعالج طلبات التأشيرات بسرعة فائقة مع الحفاظ على أعلى معايير الجودة والدقة.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>وثائق موثوقة</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  جميع وثائقنا معتمدة ومعترف بها من قبل السلطات السعودية الرسمية.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>دعم 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  فريق الدعم لدينا متاح على مدار الساعة للإجابة على جميع استفساراتك.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visa Types Section */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container">
          <h3 className="text-3xl font-bold text-center mb-12">أنواع التأشيرات المتاحة</h3>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : visaTypes && visaTypes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visaTypes.map((visa) => (
                <Card key={visa.id} className="hover:shadow-lg transition">
                  <CardHeader>
                    <CardTitle className="text-xl">{visa.nameAr}</CardTitle>
                    <CardDescription>{visa.nameEn}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 mb-4">{visa.descriptionAr}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground/60">السعر:</span>
                        <span className="font-bold text-primary">{visa.price} ر.س</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground/60">مدة المعالجة:</span>
                        <span className="font-bold">{visa.processingDays} أيام</span>
                      </div>
                    </div>
                    {isAuthenticated ? (
                      <Link href={`/apply?visa=${visa.id}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          قدم طلب
                        </Button>
                      </Link>
                    ) : (
                      <a href={getLoginUrl()} className="block">
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          قدم طلب
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/60">لا توجد أنواع تأشيرات متاحة حالياً</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <h3 className="text-3xl font-bold mb-4">هل أنت مستعد لبدء رحلتك؟</h3>
          <p className="text-lg mb-8 opacity-90">
            انضم إلى آلاف العملاء الراضين الذين استخدموا خدماتنا
          </p>
          {isAuthenticated ? (
            <Link href="/apply">
              <Button size="lg" variant="secondary">
                قدم طلبك الآن
              </Button>
            </Link>
          ) : (
            <a href={getLoginUrl()}>
              <Button size="lg" variant="secondary">
                ابدأ الآن
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h3 className="text-3xl font-bold text-center mb-12">تواصل معنا</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold mb-2">الهاتف</h4>
              <p className="text-foreground/80">+966 11 123 4567</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold mb-2">البريد الإلكتروني</h4>
              <p className="text-foreground/80">info@visaoffice.sa</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold mb-2">الموقع</h4>
              <p className="text-foreground/80">الرياض، المملكة العربية السعودية</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-8 mt-auto">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/60 text-sm">
              © 2025 مكتب التأشيرات. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-foreground/60 hover:text-primary transition text-sm">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition text-sm">
                شروط الخدمة
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition text-sm">
                اتصل بنا
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
