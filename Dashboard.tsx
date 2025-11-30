import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { data: applications, isLoading } = trpc.visa.applications.useQuery();
  const [, navigate] = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <FileText className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "موافق عليه";
      case "rejected":
        return "مرفوض";
      case "pending":
        return "قيد الانتظار";
      case "completed":
        return "مكتمل";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/5">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ت</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">مكتب التأشيرات</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-foreground/60">مرحباً</p>
              <p className="font-bold text-foreground">{user?.name}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {/* Stats Cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">
                إجمالي الطلبات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">
                قيد الانتظار
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {applications?.filter(a => a.status === "pending").length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">
                موافق عليه
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {applications?.filter(a => a.status === "approved").length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">
                مكتمل
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {applications?.filter(a => a.status === "completed").length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>طلبات التأشيرات</CardTitle>
              <CardDescription>
                عرض وإدارة جميع طلبات التأشيرات الخاصة بك
              </CardDescription>
            </div>
            <Link href="/apply">
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                <Plus className="w-4 h-4" />
                طلب جديد
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : applications && applications.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4 font-bold">الاسم</th>
                      <th className="text-right py-3 px-4 font-bold">رقم الجواز</th>
                      <th className="text-right py-3 px-4 font-bold">تاريخ السفر</th>
                      <th className="text-right py-3 px-4 font-bold">الحالة</th>
                      <th className="text-right py-3 px-4 font-bold">التاريخ</th>
                      <th className="text-right py-3 px-4 font-bold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} className="border-b hover:bg-secondary/5 transition">
                        <td className="py-3 px-4">{app.fullName}</td>
                        <td className="py-3 px-4">{app.passportNumber}</td>
                        <td className="py-3 px-4">
                          {app.travelDate
                            ? new Date(app.travelDate).toLocaleDateString("ar-SA")
                            : "-"}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(app.status)}
                            <span>{getStatusText(app.status)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {new Date(app.createdAt).toLocaleDateString("ar-SA")}
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            عرض
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/60 mb-4">لا توجد طلبات حتى الآن</p>
                <Link href="/apply">
                  <Button className="bg-primary hover:bg-primary/90">
                    قدم طلبك الأول
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
