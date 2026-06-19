import { 
Baby, BaggageClaim,   Bath, Briefcase, Bus, Car, Cctv,
CheckCircle2, Clock,   Coffee, ConciergeBell, Dices, Dog, Dumbbell, Flame, Gamepad2,   Lock, Phone, ShieldCheck, Shirt, Snowflake, Sparkles, 
  TreePine, Tv, Umbrella, 
Utensils, Waves,
 Wifi, 
Wine} from 'lucide-react';

interface AmenityTagProps {
  name: string;
  className?: string;
}

export function AmenityTag({ name, className = "" }: AmenityTagProps) {
  const getAmenityIcon = (name: string) => {
    if (!name) return <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />;

    const lowerName = name.toLowerCase();
    
    // --- اینترنت و رسانه ---
    if (lowerName.includes('wi-fi') || lowerName.includes('wifi') || lowerName.includes('internet'))
      return <Wifi className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('tv') || lowerName.includes('television'))
      return <Tv className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    
    // --- آب و تفریحات آبی ---
    if (lowerName.includes('pool') || lowerName.includes('swimming'))
      return <Waves className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('beach'))
      return <Umbrella className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
      
    // --- بهداشت و حمام ---
    if (lowerName.includes('bath') || lowerName.includes('shower'))
      return <Bath className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('laundry') || lowerName.includes('iron') || lowerName.includes('dry cleaning'))
      return <Shirt className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    
    // --- ورزش و سلامتی ---
    if (lowerName.includes('gym') || lowerName.includes('sport') || lowerName.includes('fitness'))
      return <Dumbbell className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('spa') || lowerName.includes('massage') || lowerName.includes('sauna'))
      return <Sparkles className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    
    // --- غذا و نوشیدنی ---
    if (lowerName.includes('restaurant') || lowerName.includes('food') || lowerName.includes('dining'))
      return <Utensils className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('coffee') || lowerName.includes('breakfast') || lowerName.includes('cafe'))
      return <Coffee className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('bar') || lowerName.includes('lounge') || lowerName.includes('pub'))
      return <Wine className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('bbq') || lowerName.includes('grill') || lowerName.includes('fireplace'))
      return <Flame className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    
    // --- حمل و نقل و پارکینگ ---
    if (lowerName.includes('parking') || lowerName.includes('car'))
      return <Car className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('shuttle') || lowerName.includes('transfer') || lowerName.includes('bus'))
      return <Bus className="w-3.5 h-3.5 mr-1.5 shrink-0" />;

    // --- امکانات اتاق ---
    if (lowerName.includes('ac ') || lowerName.includes('air conditioning'))
      return <Snowflake className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('safe') || lowerName.includes('deposit box'))
      return <Lock className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('phone') || lowerName.includes('telephone'))
      return <Phone className="w-3.5 h-3.5 mr-1.5 shrink-0" />;

    // --- خدمات هتل ---
    if (lowerName.includes('room service') || lowerName.includes('concierge'))
      return <ConciergeBell className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('24-hour') || lowerName.includes('24/7') || lowerName.includes('reception'))
      return <Clock className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('luggage') || lowerName.includes('storage'))
      return <BaggageClaim className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('security') || lowerName.includes('guard'))
      return <ShieldCheck className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('cctv') || lowerName.includes('camera'))
      return <Cctv className="w-3.5 h-3.5 mr-1.5 shrink-0" />;

    // --- متفرقه (کودکان، حیوانات، سرگرمی، دسترسی) ---
    if (lowerName.includes('pet') || lowerName.includes('dog'))
      return <Dog className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('business') || lowerName.includes('meeting'))
      return <Briefcase className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('baby') || lowerName.includes('child') || lowerName.includes('kids'))
      return <Baby className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('casino'))
      return <Dices className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('game') || lowerName.includes('billiard'))
      return <Gamepad2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
    if (lowerName.includes('garden') || lowerName.includes('park') || lowerName.includes('nature'))
      return <TreePine className="w-3.5 h-3.5 mr-1.5 shrink-0" />;

    // آیکون پیش‌فرض
    return <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />;
  };

  return (
    <div className={`flex items-center text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shrink-0 shadow-sm transition-colors hover:bg-gray-50 ${className}`}>
      {getAmenityIcon(name)}
      <span className="mr-1.5">{name}</span>
    </div>
  );
}
