"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import type { Mentor } from "@/lib/types";

interface PaymentProps {
  mentor: Mentor;
  bookingDetails: {
    sessions: string[];
    totalAmount: number;
    date?: Date;
    time?: string;
  };
  onComplete: () => void;
  onBack: () => void;
}

export function Payment({
  mentor,
  bookingDetails,
  onComplete,
  onBack,
}: PaymentProps) {
  const { toast } = useToast();

  const handlePayment = () => {
    // Simulate payment success
    toast({
      title: "Payment Successful!",
      description: "Your session has been booked successfully.",
    });
    onComplete();
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Complete Your Booking</h2>
          <p className="text-sm text-muted-foreground">
            Review your booking details and proceed to payment
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-4 rounded-lg bg-accent/50">
          <h3 className="font-medium mb-4">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mentor</span>
              <span>{mentor.name}</span>
            </div>
            {bookingDetails.date && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span>{format(bookingDetails.date, "MMMM d, yyyy")}</span>
              </div>
            )}
            {bookingDetails.time && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span>{bookingDetails.time}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t">
              <span className="font-medium">Total Amount</span>
              <span className="font-medium">₹{bookingDetails.totalAmount}</span>
            </div>
          </div>
        </div>

        <Button 
          className="w-full" 
          size="lg" 
          onClick={handlePayment}
        >
          Pay ₹{bookingDetails.totalAmount}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          By proceeding, you agree to our terms of service and privacy policy
        </p>
      </div>
    </Card>
  );
}