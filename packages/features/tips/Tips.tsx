import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useState } from "react";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import { localStorage } from "@calcom/lib/webstorage";
import { Card } from "@calcom/ui";

export const tips = [];

export default function Tips() {
  const [animationRef] = useAutoAnimate<HTMLDivElement>();

  const { t } = useLocale();

  const [list, setList] = useState<typeof tips>([]);

  const handleRemoveItem = (id: number) => {
    setList((currentItems) => {
      const items = localStorage.getItem("removedTipsIds") || "";
      const itemToRemoveIndex = currentItems.findIndex((item) => item.id === id);

      localStorage.setItem(
        "removedTipsIds",
        `${currentItems[itemToRemoveIndex].id.toString()}${items.length > 0 ? `,${items.split(",")}` : ""}`
      );
      currentItems.splice(itemToRemoveIndex, 1);
      return [...currentItems];
    });
  };

  useEffect(() => {
    const reversedTips = tips.slice(0).reverse();
    const removedTipsString = localStorage.getItem("removedTipsIds") || "";
    const removedTipsIds = removedTipsString.split(",").map((id) => parseInt(id, 10));
    const filteredTips = reversedTips.filter((tip) => removedTipsIds.indexOf(tip.id) === -1);
    setList(() => [...filteredTips]);
  }, []);
  const baseOriginalList = list.slice(0).reverse();
  return (
    <div
      className="hidden pt-8 pb-4 lg:grid"
      /* ref={animationRef} */
      style={{
        gridTemplateColumns: "1fr",
      }}>
      {list.map((tip) => {
        return (
          <div
            className="relative"
            style={{
              gridRowStart: 1,
              gridColumnStart: 1,
            }}
            key={tip.id}>
            <div
              className="relative"
              style={{
                transform: `scale(${1 - baseOriginalList.indexOf(tip) / 20})`,
                top: -baseOriginalList.indexOf(tip) * 10,
                opacity: `${1 - baseOriginalList.indexOf(tip) / 7}`,
              }}>
              <Card
                variant="SidebarCard"
                thumbnailUrl={tip.thumbnailUrl}
                mediaLink={tip.mediaLink}
                title={tip.title}
                description={tip.description}
                learnMore={{ href: tip.href, text: t("learn_more") }}
                actionButton={{ onClick: () => handleRemoveItem(tip.id), child: t("dismiss") }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
