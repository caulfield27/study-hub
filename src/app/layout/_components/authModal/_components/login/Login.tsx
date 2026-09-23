import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import { useGlobalStore } from "@/shared/store";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useI18n } from "@/shared/i18n";
import { Divider } from "@heroui/divider";
import { Github, Google } from "@/shared/icons";

export const Login = () => {
  const { t } = useI18n();
  const setIsAuthed = useGlobalStore((state) => state.setIsAuthed);
  const setAuthModalOpen = useGlobalStore((state) => state.setAuthModalOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setSubmitting(true);
      const result = await api.sendRequest([
        {
          method: "post",
          url: apiRoutes.login,
          data: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        },
        "public",
      ]);
      localStorage.setItem("token", result.data);
      addToast({ color: "success", title: t("auth.loginSuccess") });
      setIsAuthed(true);
      setAuthModalOpen(false);
    } catch (e: any) {
      setRequestError(e?.response?.data?.message ?? t("auth.unknownError"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        onReset={() => {
          setRequestError(null);
          setPayload({ username: "", password: "" });
        }}
        className="flex flex-col gap-6"
      >
        <Input
          color="secondary"
          isRequired
          errorMessage={t("auth.required")}
          label={t("auth.name")}
          labelPlacement="outside"
          name="username"
          placeholder={t("auth.enterName")}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPayload((prev) => ({ ...prev, username: e.target.value }))
          }
          classNames={{
            input: "placeholder:text-(--muted-foreground) text-(--foreground)",
            inputWrapper: [
              "bg-(--surface)",
              "border border-(--border-color)",
              "focus-within:ring-2 focus-within:ring-(--primary-color)",
            ],
            label: "text-(--foreground)",
          }}
        />
        <Input
          isRequired
          errorMessage={t("auth.required")}
          endContent={
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
          }
          label={t("auth.password")}
          labelPlacement="outside"
          placeholder={t("auth.enterPassword")}
          type={isVisible ? "text" : "password"}
          name="password"
          color="secondary"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPayload((prev) => ({ ...prev, password: e.target.value }))
          }
          classNames={{
            input: "placeholder:text-(--muted-foreground) text-(--foreground)",
            inputWrapper: [
              "bg-(--surface)",
              "border border-(--border-color)",
              "focus-within:ring-2 focus-within:ring-(--primary-color)",
            ],
            label: "text-(--foreground)",
          }}
        />
        {requestError ? (
          <Alert
            color="danger"
            description={requestError}
            onClose={() => setRequestError(null)}
            title={t("auth.loginFailed")}
            variant="faded"
          />
        ) : null}
        <Button
          isDisabled={submitting || !!requestError}
          isLoading={submitting}
          className="w-full"
          type="submit"
          color="primary"
        >
          {t("common.login")}
        </Button>
      </Form>
      <Divider className="my-6" />

      <div className="flex flex-col gap-4 justify-center items-center">
        <span className="text-[14px] text-(--muted-foreground)">
          Или войдите через
        </span>
        <div className="flex flex-row gap-2 justify-center items-center">
          <button className="cursor-pointer">
            <Google />
          </button>
          <button className="cursor-pointer">
            <Github />
          </button>
        </div>
      </div>
    </div>
  );
};
