import { SignIn } from '@clerk/nextjs';
import { SignOutButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function SignOutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Logout</h1>
        <p className="text-muted-foreground mb-6">Sei sicuro di voler uscire?</p>
        <SignOutButton>
          <Button variant="destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Esci
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
}
