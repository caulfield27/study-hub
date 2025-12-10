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
import { useNavigate } from "react-router";

export const Login = () => {
  const { setIsAuthed } = useGlobalStore();
  const navigate = useNavigate();
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
      const result = await api.sendRequest([{
        method: "post",
        url: apiRoutes.login,
        data: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }, 'public']);
      localStorage.setItem("token", result.data);
      addToast({ color: "success", title: "Вход выполнен успешно" });
      setIsAuthed(true);
      navigate("/");
    } catch (e: any) {
      setRequestError(e?.response?.data?.message ?? "Неизвестная ошибка");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      onReset={() => {
        setRequestError(null);
        setPayload({ username: "", password: "" });
      }}
      className="flex flex-col gap-6"
    >
      <Input
        isRequired
        errorMessage="Поле обязательно для заполнения"
        label="Имя"
        labelPlacement="outside"
        name="username"
        placeholder="Введите имя"
        type="text"
        variant="bordered"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPayload((prev) => ({ ...prev, username: e.target.value }))
        }
      />
      <Input
        isRequired
        errorMessage="Поле обязательно для заполнения"
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
        label="Пароль"
        labelPlacement="outside"
        placeholder="Введите пароль"
        type={isVisible ? "text" : "password"}
        name="password"
        variant="bordered"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPayload((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      {requestError ? (
        <Alert
          color="danger"
          description={requestError}
          endContent={
            <Button color="danger" size="md" variant="flat" type="reset">
              Повторить
            </Button>
          }
          title="Не удалось выполнить вход"
          variant="faded"
        />
      ) : null}
      <Button
        isDisabled={submitting || !!requestError}
        isLoading={submitting}
        className="w-full"
        type="submit"
        variant="shadow"
        color="secondary"
      >
        Войти
      </Button>
    </Form>
  );
};
