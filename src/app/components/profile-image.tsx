import Image from "next/image"

export default function ProfileImage() {
  return (
    <>
      <Image
        src="/img/icon-dark.webp"
        alt="プロフィール写真"
        width={300}
        height={300}
        className="rounded-full block dark:hidden"
      />
      <Image
        src="/img/icon.webp"
        alt="プロフィール写真"
        width={300}
        height={300}
        className="rounded-full hidden dark:block"
      />
    </>
  )
}
