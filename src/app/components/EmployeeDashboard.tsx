'use client';
import { useState } from 'react';

import FaceAuth from './FaceAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Payload {
  email: string;
  pin: string;
}
interface EmployeeData {
  name: string;
  position: string;
  department: string;
  photoUrl: string;
  id?: string;
  payload: Payload;
}

const EmployeeDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);

  const handleSuccessfulAuth = (data: EmployeeData) => {
    setIsAuthenticated(true);
    setEmployeeData(data);
  };

  const mockAttendanceData = [
    { date: '2024-07-14', timeIn: '09:00 AM', timeOut: '05:30 PM' },
    { date: '2024-07-13', timeIn: '08:55 AM', timeOut: '05:25 PM' },
    { date: '2024-07-12', timeIn: '09:05 AM', timeOut: '05:35 PM' },
  ];

  return (
    <div className="space-y-6">
      {!isAuthenticated ? (
        <FaceAuth onSuccessfulAuth={handleSuccessfulAuth} />
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Employee Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              {/* <Avatar
                className="h-20 w-20"
                src={employeeData?.photoUrl}
                alt={employeeData?.name}
              /> */}
              <div>
                <h2 className="text-2xl font-bold">
                  {'Appear when auth success'}
                </h2>
                <p className="text-gray-500">{employeeData?.id}</p>
                <Badge variant="outline">{'software engineer'}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Check-in</Button>
              <Button
                className="w-full"
                variant="secondary">
                Request Leave
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time In</TableHead>
                    <TableHead>Time Out</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAttendanceData.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.timeIn}</TableCell>
                      <TableCell>{record.timeOut}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default EmployeeDashboard;
