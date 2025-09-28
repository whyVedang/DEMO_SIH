import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
      role: 'farmer' // Default role for login, can be enhanced to fetch from backend
    };
    
    setTimeout(() => {
      login(userData);
      toast({
        title: t('loginSuccessful'),
        description: t('welcomeBack'),
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sage-50 via-white to-sage-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-sage-600 hover:text-sage-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('backToHome')}
              </Button>
              <LanguageSwitcher />
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 shadow-xl bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl">
                <Sprout className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {t('loginTitle')}
            </h1>
            <p className="text-gray-600">
              {t('loginSubtitle')}
            </p>
          </div>

          {/* Login Form */}
          <Card className="shadow-2xl bg-white/80 backdrop-blur-lg border-sage-200">
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium text-gray-700">
                    {t('email')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute w-5 h-5 text-sage-400 left-3 top-3" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t('enterEmail')}
                      className="h-12 pl-11 border-sage-200 focus:border-sage-500 focus:ring-sage-500 bg-white/90"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="font-medium text-gray-700">
                    {t('password')}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 text-sage-400 left-3 top-3" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t('enterPassword')}
                      className="h-12 pl-11 pr-11 border-sage-200 focus:border-sage-500 focus:ring-sage-500 bg-white/90"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute transition-colors right-3 top-3 text-sage-400 hover:text-sage-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  {isLoading ? t('signingIn') : t('signIn')}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {t('dontHaveAccount')}{' '}
                  <Link 
                    to="/signup" 
                    className="font-semibold transition-colors text-sage-600 hover:text-sage-700"
                  >
                    {t('signup')}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{t('secure')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{t('trusted')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>{t('fast')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
