import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import { addToast } from "@heroui/toast";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import { useI18n } from "@/shared/i18n";
import { themeInputClassNames } from "@/shared/ui/formTheme";
import { logout } from "@/shared/utils/auth";
import { cn } from "@/shared/utils/clx";

const emptyPayload = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const PasswordForm = () => {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [payload, setPayload] = useState(emptyPayload);

  const mismatch =
    payload.confirmPassword.length > 0 &&
    payload.newPassword !== payload.confirmPassword;
  const tooShort =
    payload.newPassword.length > 0 && payload.newPassword.length < 6;
  const canSubmit =
    payload.currentPassword &&
    payload.newPassword &&
    payload.confirmPassword &&
    !mismatch &&
    !tooShort;

  const passwordStrength = useMemo(() => {
    const value = payload.newPassword;
    if (!value) return 0;
    let score = 0;
    if (value.length >= 6) score += 1;
    if (value.length >= 10) score += 1;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1;
    if (/[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) score += 1;
    return Math.min(score, 4);
  }, [payload.newPassword]);

  const strengthMeta = [
    { label: t("profile.passwordVeryWeak"), color: "bg-danger" },
    { label: t("profile.passwordWeak"), color: "bg-danger" },
    { label: t("profile.passwordFair"), color: "bg-warning" },
    { label: t("profile.passwordGood"), color: "bg-(--primary-color)" },
    { label: t("profile.passwordStrong"), color: "bg-success" },
  ][passwordStrength];

  function handleChange(field: keyof typeof emptyPayload) {
    return (e: ChangeEvent<HTMLInputElement>) =>
      setPayload((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setSubmitting(true);
      setRequestError(null);
      const result = await api.sendRequest([
        {
          method: "put",
          url: apiRoutes.changePassword,
          data: JSON.stringify({
            currentPassword: payload.currentPassword,
            newPassword: payload.newPassword,
          }),
          headers: { "Content-Type": "application/json" },
        },
        "private",
      ]);
      addToast({
        color: "success",
        title: result?.message ?? t("profile.passwordUpdateSuccess"),
      });
      setPayload(emptyPayload);
      setTimeout(() => {
        logout();
      },1000);
    } catch (e: any) {
      setRequestError(e?.response?.data?.message ?? t("auth.unknownError"));
    } finally {
      setSubmitting(false);
    }
  }

  const visibilityToggle = (
    <button
      className="focus:outline-solid outline-transparent cursor-pointer"
      type="button"
      onClick={() => setIsVisible((prev) => !prev)}
    >
      {isVisible ? (
        <Eye className="text-2xl text-default-400 pointer-events-none" />
      ) : (
        <EyeOff className="text-2xl text-default-400 pointer-events-none" />
      )}
    </button>
  );

  return (
    <Card className="theme-surface-soft transition-shadow duration-300 hover:shadow-lg hover:shadow-(--primary-color)/5 max-sm:border-0 max-sm:bg-transparent! max-sm:shadow-none! max-sm:hover:shadow-none!">
      <CardHeader className="flex flex-row items-center gap-3 px-6 pt-6 max-sm:px-0 max-sm:pt-0">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--primary-color)/10 text-(--primary-color) ring-1 ring-(--primary-color)/20">
          <ShieldCheck size={18} />
        </span>
        <div className="flex flex-col items-start gap-1">
          <h2 className="theme-text text-lg font-semibold">
            {t("profile.changePassword")}
          </h2>
          <p className="theme-text-muted text-sm">
            {t("profile.changePasswordSubtitle")}
          </p>
        </div>
      </CardHeader>
      <CardBody className="px-6 pb-6 max-sm:px-0 max-sm:pb-0">
        <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            isRequired
            color="secondary"
            label={t("profile.currentPassword")}
            labelPlacement="outside"
            placeholder={t("profile.enterCurrentPassword")}
            type={isVisible ? "text" : "password"}
            startContent={<Lock size={16} className="theme-text-muted" />}
            endContent={visibilityToggle}
            value={payload.currentPassword}
            onChange={handleChange("currentPassword")}
            classNames={themeInputClassNames}
          />
          <div className="flex flex-col gap-2">
            <Input
              isRequired
              color="secondary"
              label={t("profile.newPassword")}
              labelPlacement="outside"
              placeholder={t("profile.enterNewPassword")}
              type={isVisible ? "text" : "password"}
              startContent={<Lock size={16} className="theme-text-muted" />}
              endContent={visibilityToggle}
              value={payload.newPassword}
              isInvalid={tooShort}
              errorMessage={
                tooShort ? t("profile.passwordTooShort") : undefined
              }
              onChange={handleChange("newPassword")}
              classNames={themeInputClassNames}
            />
            {payload.newPassword.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex flex-1 gap-1">
                  {[0, 1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={cn(
                        "h-1.5 flex-1 rounded-full theme-surface-strong transition-colors duration-300",
                        step < passwordStrength && strengthMeta.color,
                      )}
                    />
                  ))}
                </div>
                <span className="theme-text-muted text-xs whitespace-nowrap">
                  {strengthMeta.label}
                </span>
              </div>
            )}
          </div>
          <Input
            isRequired
            color="secondary"
            label={t("profile.confirmPassword")}
            labelPlacement="outside"
            placeholder={t("profile.enterConfirmPassword")}
            type={isVisible ? "text" : "password"}
            startContent={<Lock size={16} className="theme-text-muted" />}
            endContent={visibilityToggle}
            value={payload.confirmPassword}
            isInvalid={mismatch}
            errorMessage={mismatch ? t("profile.passwordMismatch") : undefined}
            onChange={handleChange("confirmPassword")}
            classNames={themeInputClassNames}
          />

          {requestError ? (
            <Alert color="danger" description={requestError} variant="flat" />
          ) : null}

          <Button
            type="submit"
            color="primary"
            className="w-fit max-sm:w-full transition-transform duration-150 active:scale-95"
            isLoading={submitting}
            isDisabled={submitting || !canSubmit}
          >
            {t("common.save")}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
