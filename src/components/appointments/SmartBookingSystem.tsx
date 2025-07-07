"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, AlertTriangle, CheckCircle, Wrench } from 'lucide-react';
import { format } from 'date-fns';
import { ServiceBooking, MotorcycleInfo, ServiceType } from '@/types/enhanced';
import { useToast } from '@/hooks/use-toast';

interface TimeSlot {
  time: string;
  available: boolean;
  estimatedDuration: number;
  technicianName?: string;
}

export function SmartBookingSystem() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [serviceType, setServiceType] = useState<ServiceType>('maintenance');
  const [motorcycleInfo, setMotorcycleInfo] = useState<Partial<MotorcycleInfo>>({});
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'emergency'>('medium');
  const [estimatedCost, setEstimatedCost] = useState<{min: number; max: number}>({min: 0, max: 0});
  const { toast } = useToast();

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (serviceType && motorcycleInfo.make && motorcycleInfo.model) {
      calculateEstimatedCost();
    }
  }, [serviceType, motorcycleInfo, symptoms]);

  const fetchAvailableSlots = async (date: Date) => {
    // Simulate API call to get available time slots
    const slots: TimeSlot[] = [
      { time: '09:00', available: true, estimatedDuration: 120, technicianName: 'Mike Johnson' },
      { time: '11:00', available: true, estimatedDuration: 90, technicianName: 'Sarah Wilson' },
      { time: '14:00', available: false, estimatedDuration: 60 },
      { time: '16:00', available: true, estimatedDuration: 180, technicianName: 'Alex Rodriguez' },
    ];
    setAvailableSlots(slots);
  };

  const calculateEstimatedCost = async () => {
    // AI-powered cost estimation based on service type and motorcycle info
    let baseCost = 0;
    
    switch (serviceType) {
      case 'maintenance':
        baseCost = 150;
        break;
      case 'repair':
        baseCost = 200;
        break;
      case 'inspection':
        baseCost = 80;
        break;
      case 'customization':
        baseCost = 300;
        break;
      case 'emergency':
        baseCost = 250;
        break;
    }

    // Adjust based on motorcycle age and complexity
    const currentYear = new Date().getFullYear();
    const age = motorcycleInfo.year ? currentYear - motorcycleInfo.year : 0;
    const ageMultiplier = 1 + (age * 0.02); // 2% increase per year

    const symptomMultiplier = 1 + (symptoms.length * 0.1); // 10% increase per symptom

    const adjustedCost = baseCost * ageMultiplier * symptomMultiplier;
    
    setEstimatedCost({
      min: Math.round(adjustedCost * 0.8),
      max: Math.round(adjustedCost * 1.3),
    });
  };

  const handleSymptomAdd = (symptom: string) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handleSymptomRemove = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot || !motorcycleInfo.make) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const booking: Partial<ServiceBooking> = {
      serviceType,
      motorcycleInfo: motorcycleInfo as MotorcycleInfo,
      preferredDate: selectedDate,
      urgency,
      description,
      estimatedCost: (estimatedCost.min + estimatedCost.max) / 2,
      status: 'pending',
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Booking Confirmed!",
        description: `Your appointment is scheduled for ${format(selectedDate, 'PPP')} at ${selectedSlot}`,
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'emergency': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Smart Booking System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Service Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="service-type">Service Type</Label>
              <Select value={serviceType} onValueChange={(value: ServiceType) => setServiceType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintenance">Regular Maintenance</SelectItem>
                  <SelectItem value="repair">Repair Service</SelectItem>
                  <SelectItem value="inspection">Safety Inspection</SelectItem>
                  <SelectItem value="customization">Customization</SelectItem>
                  <SelectItem value="emergency">Emergency Service</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select value={urgency} onValueChange={(value: any) => setUrgency(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              <Badge className={`mt-1 ${getUrgencyColor(urgency)} text-white`}>
                {urgency.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Motorcycle Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="make">Make</Label>
              <Input
                id="make"
                value={motorcycleInfo.make || ''}
                onChange={(e) => setMotorcycleInfo({...motorcycleInfo, make: e.target.value})}
                placeholder="Honda, Yamaha, etc."
              />
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={motorcycleInfo.model || ''}
                onChange={(e) => setMotorcycleInfo({...motorcycleInfo, model: e.target.value})}
                placeholder="CBR600RR, R1, etc."
              />
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={motorcycleInfo.year || ''}
                onChange={(e) => setMotorcycleInfo({...motorcycleInfo, year: parseInt(e.target.value)})}
                placeholder="2020"
              />
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Available Time Slots</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedSlot === slot.time ? "default" : "outline"}
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.time)}
                    className="flex flex-col items-center p-2 h-auto"
                  >
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {slot.time}
                    </div>
                    {slot.available && (
                      <div className="text-xs text-muted-foreground">
                        {slot.technicianName}
                      </div>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Cost Estimation */}
          {estimatedCost.max > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Estimated Cost</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    ${estimatedCost.min} - ${estimatedCost.max}
                  </div>
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  Final cost may vary based on actual work required
                </p>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <div>
            <Label htmlFor="description">Additional Details</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe any specific issues or requirements..."
              rows={3}
            />
          </div>

          <Button onClick={handleBooking} className="w-full" size="lg">
            Confirm Booking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}