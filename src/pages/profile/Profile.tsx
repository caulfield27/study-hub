import { UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/shared/ui/PageHeader/PageHeader";
import { useI18n } from "@/shared/i18n";
import { AccountForm, PasswordForm, Preferences } from "./_components";
import { useGlobalStore } from "@/shared/store";
import { AccountFormSkeleton } from "@/shared/skeletons/profile/AccountFormSkeleton";
import { PasswordFormSkeleton } from "@/shared/skeletons/profile/PasswordFormSkeleton";
import { PreferencesSkeleton } from "@/shared/skeletons/profile/PreferencesSkeleton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

function Profile() {
  const { t } = useI18n();
  const meLoading = useGlobalStore((state) => state.meLoading);

  return (
    <div className="relative flex flex-col gap-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-full max-w-2xl -translate-x-1/2 rounded-full bg-(--primary-color)/15 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <PageHeader
          Icon={UserRound}
          label={t("profile.label")}
          title={t("profile.title")}
          description={t("profile.description")}
        />
      </motion.div>

      <div className="flex flex-col gap-6 w-full">
        {meLoading ? (
          <>
            <AccountFormSkeleton />
            <PasswordFormSkeleton />
            <PreferencesSkeleton />
          </>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={itemVariants}>
              <AccountForm />
            </motion.div>
            <motion.div variants={itemVariants}>
              <PasswordForm />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Preferences />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Profile;
