import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  date: string;
  image: string;
  detailLink: string;
}

export default function BlogCard({
  title,
  date,
  image,
  detailLink,
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden border-0  hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
      <Link href={detailLink}>
        <div className="relative aspect-video">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-6 py-6">
          <time className="font-semibold text-sm text-muted-foreground mb-4">
            {format(date, "yyyy-MM-dd")}
          </time>
          <h3 className="font-semibold text-xl mb-2">{title}</h3>
        </CardContent>
      </Link>
    </Card>
  );
}
