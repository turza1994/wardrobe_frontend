import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface VendorInfoCardProps {
  id: string;
  name: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
  joinedDate: string;
  isFollowing?: boolean;
  className?: string;
}

export function VendorInfoCard({
  id,
  name,
  avatarUrl,
  rating,
  reviewCount,
  joinedDate,
  isFollowing = false,
  className,
}: VendorInfoCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link href={`/vendors/${id}`}>
            <Avatar className="h-16 w-16 border-2 border-primary/10">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="text-lg bg-primary/10 text-primary">
                {name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
          
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-lg hover:underline cursor-pointer">
              <Link href={`/vendors/${id}`}>{name}</Link>
            </h3>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-warning text-warning mr-1" />
                <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
                <span className="ml-1">({reviewCount} reviews)</span>
              </div>
              <span>•</span>
              <span>Joined {joinedDate}</span>
            </div>
          </div>
          
          <div className="w-full sm:w-auto mt-2 sm:mt-0 flex flex-row sm:flex-col gap-2">
            <Button 
              variant={isFollowing ? "outline" : "default"} 
              className="flex-1 sm:flex-none w-full sm:w-[120px]"
            >
              {isFollowing ? "Following" : "Follow Store"}
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1 sm:flex-none w-full sm:w-[120px]"
              asChild
            >
              <Link href={`/vendors/${id}`}>Visit Store</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
