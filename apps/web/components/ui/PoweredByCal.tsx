import Link from "next/link";

import { useIsEmbed } from "@calcom/embed-core/embed-iframe";
import { POWERED_BY_URL } from "@calcom/lib/constants";
import { useLocale } from "@calcom/lib/hooks/useLocale";

const PoweredByCal = () => {
  const { t } = useLocale();
  const isEmbed = useIsEmbed();
  return (
    <div className={"p-2 text-center text-xs sm:text-right" + (isEmbed ? " max-w-3xl" : "")}>
      <Link
        href={POWERED_BY_URL}
        target="_blank"
        className="text-bookinglight opacity-50 hover:opacity-100 dark:text-white">
        {t("powered_by")} Complete Pair
      </Link>
    </div>
  );
};

export default PoweredByCal;
