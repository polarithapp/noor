"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoonStar, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../lib/config";
import { GoldButton, OutlineButton, AnimatedInput } from "../../components/ui/SharedElements";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    gender: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, color: "bg-border-subtle" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ==========================================
  // PASSWORD STRENGTH LOGIC
  // ==========================================
  useEffect(() => {
    const pwd = formData.password;
    let score = 0;
    if (pwd.length > 7) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    let color = "bg-border-subtle";
    if (pwd.length > 0) {
      if (score <= 1) color = "bg-red-500";
      else if (score === 2) color = "bg-yellow-500";
      else if (score >= 3) color = "bg-accent-emerald";
    }
    
    setPasswordStrength({ score, color });
  }, [formData.password]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ==========================================
  // AUTHENTICATION LOGIC
  // ==========================================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!termsAccepted) {
      setError("You must accept the Terms and Conditions.");
      return;
    }

    setIsLoading(true);
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Update display name
      await updateProfile(userCredential.user, {
        displayName: formData.fullName,
      });

      // Note: In a production environment, you would also save formData.country and formData.gender to Firestore here.

      router.push("/dashboard/student");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard/student");
    } catch (err) {
      setError("Google sign-up failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-bg-base overflow-hidden">
      
      {/* LEFT PANEL: Branding & Visuals (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-center items-center p-12 border-r border-border-subtle">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23C9A84C' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/20 to-bg-base/90 z-0" />

        <div className="relative z-10 text-center max-w-md">
          <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
            <MoonStar className="text-accent-gold w-12 h-12 group-hover:animate-pulse-glow" />
            <span className="font-display text-5xl font-bold text-text-primary tracking-wide">NOOR</span>
          </Link>
          
          <h2 className="font-quran text-3xl text-accent-gold mb-6 leading-relaxed" dir="rtl">
            طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
          </h2>
          <p className="text-text-secondary text-lg italic">
            "Seeking knowledge is an obligation upon every Muslim."
          </p>
          <p className="text-text-muted text-sm mt-2">— Sunan Ibn Majah</p>
        </div>
      </div>

      {/* RIGHT PANEL: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass-panel p-8 md:p-10 z-10 my-8"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Create Account</h1>
            <p className="text-text-secondary">Join thousands of students learning the Quran.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <AnimatedInput 
              label="Full Name" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required 
            />

            <AnimatedInput 
              label="Email Address" 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />

            <div className="grid grid-cols-2 gap-4">
              <select 
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full bg-bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold appearance-none"
              >
                <option value="" disabled>Select Country</option>
                <option value="IN">🇮🇳 India</option>
                <option value="US">🇺🇸 United States</option>
                <option value="UK">🇬🇧 United Kingdom</option>
                <option value="AE">🇦🇪 UAE</option>
                <option value="PK">🇵🇰 Pakistan</option>
                <option value="BD">🇧🇩 Bangladesh</option>
                <option value="OTHER">🌍 Other</option>
              </select>

              <select 
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full bg-bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold appearance-none"
              >
                <option value="" disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="relative">
              <AnimatedInput 
                label="Password" 
                type={showPassword ? "text" : "password"} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-text-muted hover:text-accent-gold transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Strength Meter */}
            <div className="w-full h-1.5 bg-bg-surface rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${passwordStrength.color}`}
                initial={{ width: "0%" }}
                animate={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </div>

            <AnimatedInput 
              label="Confirm Password" 
              type={showPassword ? "text" : "password"} 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />

            <label className="flex items-start gap-3 cursor-pointer group mt-2">
              <input 
                type="checkbox" 
                className="hidden peer"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <div className="w-5 h-5 mt-0.5 shrink-0 border border-border-subtle rounded flex items-center justify-center peer-checked:bg-accent-gold peer-checked:border-accent-gold transition-colors">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: termsAccepted ? 1 : 0 }}
                  className="text-bg-base"
                >
                  <ShieldCheck size={14} />
                </motion.div>
              </div>
              <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                I agree to the <a href="#" className="text-accent-gold hover:underline">Terms of Service</a> and <a href="#" className="text-accent-gold hover:underline">Privacy Policy</a>.
              </span>
            </label>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <GoldButton 
              type="submit" 
              className="w-full mt-4" 
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </GoldButton>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-[1px] flex-grow bg-border-subtle" />
            <span className="text-text-muted text-sm">OR</span>
            <div className="h-[1px] flex-grow bg-border-subtle" />
          </div>

          <OutlineButton 
            onClick={handleGoogleSignup} 
            className="w-full flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </OutlineButton>

          <p className="text-center text-text-secondary mt-8 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-accent-gold hover:text-accent-gold-light font-medium transition-colors">
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
          }
                
