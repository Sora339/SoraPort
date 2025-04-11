import Link from "next/link";
import { LIMIT } from "@/lib/constants";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
  totalCount,
  currentPage = 1,
}: {
  totalCount: number;
  currentPage: number;
}) => {
  const totalPages = Math.ceil(totalCount / LIMIT);

  const createHref = (page: number) => `blog/${page}`;

  const isDisabled = (condition: boolean) =>
    condition ? "opacity-50 pointer-events-none" : "";

  return (
    <ul className="mt-20 flex items-start justify-center space-x-3 md:space-x-4">
      <li>
        <Link
          href={createHref(1)}
          className={`relative rounded-md bg-[#F6F3EA] p-2 px-5 text-sm shadow hover:opacity-70 md:p-2 md:px-5 md:text-lg ${isDisabled(
            currentPage === 1
          )}`}
        >
          <ChevronFirst className="absolute right-2 top-1 bottom-0 md:top-auto md:bottom-[6px] md:right-2"/>
        </Link>
      </li>
      <li>
        <Link
          href={createHref(currentPage - 1)}
          className={`relative rounded-md bg-[#F6F3EA] p-2 px-5 text-sm shadow hover:opacity-70 md:p-2 md:px-5 md:text-lg ${isDisabled(
            currentPage === 1
          )}`}
        >
          <ChevronLeft className="absolute right-2 top-1 bottom-0 md:top-auto md:bottom-[6px] md:right-2"/>
        </Link>
      </li>
      <li>
        <span className="rounded-md bg-[#F6F3EA] p-2 px-2 text-base shadow md:p-2 md:px-3 md:text-lg">
          {currentPage} / {totalPages}
        </span>
      </li>
      <li>
        <Link
          href={createHref(currentPage + 1)}
          className={`relative rounded-md bg-[#F6F3EA] p-2 px-5 text-sm shadow hover:opacity-70 md:p-2 md:px-5 md:text-lg ${isDisabled(
            currentPage === totalPages
          )}`}
        >
          <ChevronRight className="absolute right-2 top-1 bottom-0 md:top-auto md:bottom-[6px] md:right-2"/>
        </Link>
      </li>
      <li>
        <Link
          href={createHref(totalPages)}
          className={`relative rounded-md bg-[#F6F3EA] p-2 px-5 text-sm shadow hover:opacity-70 md:p-2 md:px-5 md:text-lg ${isDisabled(
            currentPage === totalPages
          )}`}
        >
          <ChevronLast className="absolute right-2 top-1 md:top-auto md:bottom-[6px] md:right-2"/>
        </Link>
      </li>
    </ul>
  );
};
