"use client"
import { glass } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useMemo } from "react";



import { cn } from "@workspace/ui/lib/utils"
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar";




interface DiceBearAvatarProps {
  seed: string;
  size?: number;
  className?: string;
  badgeClassName?: string;
  imageUrl?: string;
  badgeImageUrl?: string;
}
const DiceBearAvatar = ({
  seed,
  size = 32,
  className,
  badgeClassName,
  imageUrl,
  badgeImageUrl,
}: DiceBearAvatarProps) => {
    const avatarSrc = useMemo(() => {
      if (imageUrl) {
        return imageUrl;
      }
      const avatar = createAvatar(glass, {
        seed: seed.toLowerCase().trim(),
        size,
      });
      return avatar.toDataUri();
    }, [seed, size, imageUrl]);
    const badgeSize = Math.round(size * 0.5);

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <Avatar
        className={cn("border", className)}
        style={{ width: size, height: size }}
      >
        <AvatarImage alt={seed.toLowerCase()} src={avatarSrc} />
      </Avatar>
      {badgeImageUrl && (
        <div
          className={cn(
            "absolute right-0 bottom-0 flex items-center justify-center overflow-hidden rounded-full border-2 border-background bg-background",
            badgeClassName
          )}
          style={{
            width: badgeSize,
            height: badgeSize,
            transform: "translate(15%,15%)",
          }}
        >
          <img
            alt="Badge"
            className="h-full w-full object-cover"
            height={badgeSize}
            src={badgeImageUrl}
            width={badgeSize}
          />
        </div>
      )}
    </div>
  );
};
export default DiceBearAvatar