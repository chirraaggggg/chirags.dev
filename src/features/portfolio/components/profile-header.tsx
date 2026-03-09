import { USER } from "@/features/portfolio/data/user";

import { PronounceMyName } from "./pronounce-my-name";

export function ProfileHeader() {
  return (
    <div className="flex border-x border-edge">
      <div className="flex flex-1 flex-col">
        <div>
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-3.5xl sm:text-3xl font-semibold">
              {USER.displayName}
            </h1>
          </div>

          <div className="py-2 pl-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>
                Available - Open to new freelance projects and collaborations
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
