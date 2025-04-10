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
    <Card className="max-w-[400px] md:max-w-[450px] lg:max-w-[500px] mx-auto overflow-hidden border-0 hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
      <Link href={detailLink}>
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={500}
          height={330}
          className="object-cover aspect-video transition-transform hover:scale-105"
        />
        <CardContent className="p-5 lg:p-6">
          <h3 className="line-clamp-2 mb-1 md:mb-2 h-[3rem] font-semibold text-[1rem] leading-6 md:text-[1.1rem]">
            {title}
          </h3>
          <time className="font-semibold text-sm text-muted-foreground">
            {format(date, "yyyy-MM-dd")}
          </time>
        </CardContent>
      </Link>
    </Card>
  );
}
