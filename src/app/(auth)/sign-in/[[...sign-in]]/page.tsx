import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-background">
      <div className="relative w-full max-w-md">
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-mint/5 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-mint/5 blur-3xl rounded-full" />
        
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-brand-mint hover:bg-emerald-600 text-sm font-bold normal-case transition-all",
              card: "bg-surface border border-border shadow-2xl rounded-3xl p-8",
              headerTitle: "text-2xl font-black tracking-tight text-foreground",
              headerSubtitle: "text-slate-500 font-medium",
              socialButtonsBlockButton: 
                "bg-white dark:bg-white/5 border-border dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all",
              socialButtonsBlockButtonText: "text-foreground font-semibold",
              formFieldLabel: "text-slate-400 text-xs font-black uppercase tracking-widest",
              formFieldInput: 
                "bg-white dark:bg-white/5 border-border dark:border-white/10 rounded-xl text-foreground",
              footerActionLink: "text-brand-mint hover:text-emerald-400 font-bold",
              identityPreviewText: "text-foreground",
              userButtonPopoverCard: "bg-surface border-border",
            },
          }}
        />
      </div>
    </div>
  );
}
