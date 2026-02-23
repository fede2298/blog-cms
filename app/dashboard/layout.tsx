import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { LayoutDashboard, FileText, Folder, MessageSquare, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserButton } from '@clerk/nextjs';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Articoli', href: '/dashboard/posts', icon: FileText },
  { name: 'Categorie', href: '/dashboard/categories', icon: Folder },
  { name: 'Commenti', href: '/dashboard/comments', icon: MessageSquare },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <div className="flex min-h-screen">
        <aside className="w-64 border-r bg-card fixed h-full">
          <div className="p-6 flex items-center justify-between">
            <h1 className="text-xl font-bold">Blog CMS</h1>
            <ThemeToggle />
          </div>
          <nav className="px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </aside>
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </ClerkProvider>
  );
}
