import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import { addToast } from "@heroui/toast";
import { AtSign, Camera, IdCard, Mail } from "lucide-react";
import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import { useGlobalStore } from "@/shared/store";
import { useI18n } from "@/shared/i18n";
import { getFile } from "@/shared/utils/getFile";
import { themeInputClassNames } from "@/shared/ui/formTheme";

export const AccountForm = () => {
  const { t } = useI18n();
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [payload, setPayload] = useState({
    username: user?.username ?? "",
    email: user?.email ?? "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const avatarSrc =
    avatarPreview ?? (user?.avatar ? getFile(user.avatar) : undefined);

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setSubmitting(true);
      setRequestError(null);

      const formData = new FormData();
      formData.append("username", payload.username);
      formData.append("email", payload.email);
      if (avatarFile) formData.append("avatar", avatarFile);

      const result = await api.sendRequest([
        {
          method: "put",
          url: apiRoutes.updateMe,
          data: formData,
        },
        "private",
      ]);
      setUser(result);
      addToast({
        color: "success",
        title: result?.message ?? t("profile.updateSuccess"),
      });
    } catch (e: any) {
      setRequestError(e?.response?.data?.message ?? t("auth.unknownError"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="theme-surface-soft transition-shadow duration-300 hover:shadow-lg hover:shadow-(--primary-color)/5 max-sm:border-0 max-sm:bg-transparent! max-sm:shadow-none! max-sm:hover:shadow-none!">
      <CardHeader className="flex flex-row items-center gap-3 px-6 pt-6 max-sm:px-0 max-sm:pt-0">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--primary-color)/10 text-(--primary-color) ring-1 ring-(--primary-color)/20">
          <IdCard size={18} />
        </span>
        <div className="flex flex-col items-start gap-1">
          <h2 className="theme-text text-lg font-semibold">
            {t("profile.accountTitle")}
          </h2>
          <p className="theme-text-muted text-sm">
            {t("profile.accountSubtitle")}
          </p>
        </div>
      </CardHeader>
      <CardBody className="px-6 pb-6 max-sm:px-0 max-sm:pb-0">
        <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <motion.div
              className="relative shrink-0"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="rounded-full ring-2 ring-(--primary-color)/25 ring-offset-2 ring-offset-(--surface-soft) transition-shadow duration-300 hover:ring-(--primary-color)/50">
                <Avatar
                  src={avatarSrc}
                  name={user?.username ?? "u"}
                  color="primary"
                  className="w-20 h-20 text-large"
                />
              </div>
              <button
                type="button"
                aria-label={t("profile.avatarHint")}
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 flex items-center justify-center w-7 h-7 rounded-full bg-(--primary-color) text-white border-2 theme-surface-soft cursor-pointer transition-transform duration-200 hover:scale-110 hover:shadow-md active:scale-95"
              >
                <Camera className="text-(--foreground)" size={14} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </motion.div>
            <p className="theme-text-muted text-sm">
              {t("profile.avatarHint")}
            </p>
          </div>

          <Input
            isRequired
            color="secondary"
            label={t("auth.name")}
            labelPlacement="outside"
            placeholder={t("auth.enterName")}
            name="username"
            startContent={<AtSign size={16} className="theme-text-muted" />}
            value={payload.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPayload((prev) => ({ ...prev, username: e.target.value }))
            }
            classNames={themeInputClassNames}
          />
          <Input
            isRequired
            type="email"
            color="secondary"
            label={t("auth.email")}
            labelPlacement="outside"
            placeholder={t("auth.enterEmail")}
            name="email"
            startContent={<Mail size={16} className="theme-text-muted" />}
            value={payload.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPayload((prev) => ({ ...prev, email: e.target.value }))
            }
            classNames={themeInputClassNames}
          />

          {requestError ? (
            <Alert
              color="danger"
              description={requestError}
              variant="flat"
              onClose={() => setRequestError(null)}
            />
          ) : null}

          <Button
            type="submit"
            color="primary"
            className="w-fit max-sm:w-full transition-transform duration-150 active:scale-95"
            isLoading={submitting}
            isDisabled={submitting}
          >
            {t("common.submit")}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
