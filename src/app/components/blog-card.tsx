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
        <CardContent className="p-5 lg:p-6">

          <h3 className="line-clamp-2 mb-1 md:mb-2 h-[3rem] font-semibold text-[1rem] leading-6 md:text-[1.3rem]">{title}</h3>
          <time className="font-semibold text-sm text-muted-foreground">
            {format(date, "yyyy-MM-dd")}
          </time>
        </CardContent>
      </Link>
    </Card>
  );
}
