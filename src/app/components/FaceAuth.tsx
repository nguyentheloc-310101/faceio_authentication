'use client';
import { useEffect } from 'react';
import faceIO from '@faceio/fiojs';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FaceAuthProps {
  onSuccessfulAuth: (data: any) => void;
}

const FaceAuth: React.FC<FaceAuthProps> = ({ onSuccessfulAuth }) => {
  const { toast } = useToast();

  useEffect(() => {
    const faceio = new faceIO(process.env.NEXT_PUBLIC_FACEIO_APP_ID);

    const enrollNewUser = async () => {
      try {
        const userInfo = await faceio.enroll({
          locale: 'auto',
          payload: {
            email: 'rngbeo@example.com',
            pin: '12345',
          },
        });
        toast({
          title: 'Success!',
          description: "You're now enrolled in the facial recognition system!",
        });
        console.log('User Enrolled!', userInfo);
      } catch (errCode) {
        toast({
          title: 'Oops!',
          description: 'Enrollment failed. Please try again.',
          variant: 'destructive',
        });
        console.error('Enrollment Failed', errCode);
      }
    };

    const authenticateUser = async () => {
      try {
        const userData = await faceio.authenticate();
        toast({
          title: 'Welcome back!',
          description: 'Authentication successful.',
        });
        console.log('User Authenticated!', userData);
        onSuccessfulAuth(userData);
      } catch (errCode) {
        toast({
          title: 'Authentication failed',
          description: 'Please try again or enroll.',
          variant: 'destructive',
        });
        console.error('Authentication Failed', errCode);
      }
    };

    const enrollBtn = document.getElementById('enroll-btn');
    const authBtn = document.getElementById('auth-btn');

    if (enrollBtn) enrollBtn.onclick = enrollNewUser;
    if (authBtn) authBtn.onclick = authenticateUser;

    return () => {
      if (enrollBtn) enrollBtn.onclick = null;
      if (authBtn) authBtn.onclick = null;
    };
  }, [toast, onSuccessfulAuth]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Facial Authentication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          id="enroll-btn"
          variant="outline"
          className="w-full">
          Enroll New Employee
        </Button>
        <Button
          id="auth-btn"
          variant="default"
          className="w-full">
          Authenticate
        </Button>
      </CardContent>
    </Card>
  );
};

export default FaceAuth;
