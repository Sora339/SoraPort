import Link from "next/link";
import { LIMIT } from "@/lib/constants";

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
    <ul className="mt-8 flex items-center justify-center space-x-1 md:space-x-4">
      <li>
        <Link
          href={createHref(1)}
          className={`rounded-md bg-[#F6F3EA] p-1 px-2 text-sm shadow hover:opacity-70 md:p-2 md:px-3 md:text-lg ${isDisabled(
            currentPage === 1
          )}`}
        >
          最初へ
        </Link>
      </li>
      <li>
        <Link
          href={createHref(currentPage - 1)}
          className={`rounded-md bg-[#F6F3EA] p-1 px-2 text-sm shadow hover:opacity-70 md:p-2 md:px-3 md:text-lg ${isDisabled(
            currentPage === 1
          )}`}
        >
          前へ
        </Link>
      </li>
      <li>
        <span className="rounded-md bg-[#F6F3EA] p-1 px-2 text-xs shadow md:p-2 md:px-3 md:text-lg">
          {currentPage} / {totalPages}
        </span>
      </li>
      <li>
        <Link
          href={createHref(currentPage + 1)}
          className={`rounded-md bg-[#F6F3EA] p-1 px-2 text-sm shadow hover:opacity-70 md:p-2 md:px-3 md:text-lg ${isDisabled(
            currentPage === totalPages
          )}`}
        >
          次へ
        </Link>
      </li>
      <li>
        <Link
          href={createHref(totalPages)}
          className={`rounded-md bg-[#F6F3EA] p-1 px-2 text-sm shadow hover:opacity-70 md:p-2 md:px-3 md:text-lg ${isDisabled(
            currentPage === totalPages
          )}`}
        >
          最後へ
        </Link>
      </li>
    </ul>
  );
};
