import { BlueprintBackground } from "@/components/retro/blueprint-background";
import { RetroFooter } from "@/components/retro/footer";
import { RetroNav } from "@/components/retro/retro-nav";
import { SideQuests } from "@/components/retro/side-quests";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const tab = params.tab;

  return (
    <div className="retro-site">
      <BlueprintBackground />
      <RetroNav />
      <SideQuests initialTab={tab} />
      <RetroFooter />
    </div>
  );
}
