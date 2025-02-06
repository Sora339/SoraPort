import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techs: string[];
  detailLink: string;
  githubLink: string;
  deployLink: string;
}

export default function WorkCard({
  title,
  description,
  image,
  detailLink,
  githubLink,
  deployLink,
  techs,
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transform hover:scale-105 transition-transform duration-300 border-0">
      <Link href={detailLink}>
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={500}
          height={330}
          className="object-cover aspect-video transition-transform hover:scale-105"
        />

        <CardContent className="p-6">
          <h3 className="font-semibold text-2xl mb-2 line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {techs
              .slice(0, 3)
              .sort()
              .map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/30"
                >
                  {tech}
                </span>
              ))}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        {deployLink && (
          <Link
            href={deployLink}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm hover:underline"
          >
            <Globe className="h-4 w-4" />
            サイトを見る
          </Link>
        )}
        <Link
          href={githubLink}
          target="_blank"
          className="ml-4 inline-flex items-center gap-2 text-sm hover:underline"
        >
          <Github className="h-4 w-4" />
          ソースコード
        </Link>
      </CardFooter>
    </Card>
  );
}
