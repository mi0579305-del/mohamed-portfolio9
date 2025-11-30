import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";

export default function Apply() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    passportNumber: "",
    nationality: "",
    travelDate: "",
    visaType: "",
    notes: "",
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/5">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>يجب تسجيل الدخول</CardTitle>
            <CardDescription>
              يجب عليك تسجيل الدخول لتقديم طلب تأشيرة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full bg-primary hover:bg-primary/90">
                العودة للرئيسية
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || 
        !formData.passportNumber || !formData.nationality || !formData.visaType) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("تم تقديم الطلب بنجاح! سيتم التواصل معك قريباً");
      navigate("/dashboard");
    } catch (error) {
      toast.error("حدث خطأ أثناء تقديم الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/5">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowRight className="w-5 h-5" />
            <span className="text-sm">العودة</span>
          </Link>
          <h1 className="text-2xl font-bold text-primary">تقديم طلب تأشيرة</h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>نموذج طلب التأشيرة</CardTitle>
              <CardDescription>
                يرجى ملء جميع الحقول المطلوبة بدقة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-bold mb-4">البيانات الشخصية</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">الاسم الكامل *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="أدخل اسمك الكامل"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="example@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+966 5XXXXXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Passport Information */}
                <div>
                  <h3 className="text-lg font-bold mb-4">بيانات الجواز</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="passportNumber">رقم الجواز *</Label>
                        <Input
                          id="passportNumber"
                          name="passportNumber"
                          placeholder="أدخل رقم جوازك"
                          value={formData.passportNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="nationality">الجنسية *</Label>
                        <Input
                          id="nationality"
                          name="nationality"
                          placeholder="أدخل جنسيتك"
                          value={formData.nationality}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visa Information */}
                <div>
                  <h3 className="text-lg font-bold mb-4">بيانات التأشيرة</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="visaType">نوع التأشيرة *</Label>
                        <Select 
                          value={formData.visaType} 
                          onValueChange={(value) => handleSelectChange(value, "visaType")}
                        >
                          <SelectTrigger id="visaType">
                            <SelectValue placeholder="اختر نوع التأشيرة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tourist">تأشيرة سياحية</SelectItem>
                            <SelectItem value="business">تأشيرة عمل</SelectItem>
                            <SelectItem value="visit">تأشيرة زيارة</SelectItem>
                            <SelectItem value="transit">تأشيرة عبور</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="travelDate">تاريخ السفر المتوقع</Label>
                        <Input
                          id="travelDate"
                          name="travelDate"
                          type="date"
                          value={formData.travelDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <h3 className="text-lg font-bold mb-4">ملاحظات إضافية</h3>
                  <div>
                    <Label htmlFor="notes">ملاحظات أو معلومات إضافية</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="أضف أي معلومات إضافية تراها مهمة"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary hover:bg-primary/90 gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSubmitting ? "جاري التقديم..." : "تقديم الطلب"}
                  </Button>
                  <Link href="/dashboard" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      إلغاء
                    </Button>
                  </Link>
                </div>

                <p className="text-xs text-foreground/60 text-center">
                  * الحقول المطلوبة
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
