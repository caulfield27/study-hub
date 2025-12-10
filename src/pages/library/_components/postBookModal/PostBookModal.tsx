import { useState } from "react";
import { isLink } from "@/shared/utils/utils";
import type { IBook, IPostBookValidation } from "../../Library.types";
import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import type { Props } from "./PostBookModal.types";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui//button";
import { DateInput } from "@heroui/date-input";
import { addToast } from "@heroui/toast";

export function PostBookModal({ onSuccess, isOpen, onClose }: Props) {
  const [postData, setPostData] = useState<IBook>({
    name: "",
    author: "",
    image: "",
    pdf: "",
    rating: null,
    released: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState<IPostBookValidation>({
    name: {
      isValid: true,
      message: "",
    },
    author: {
      isValid: true,
      message: "",
    },
    image: {
      isValid: true,
      message: "",
    },
    pdf: {
      isValid: true,
      message: "",
    },
    rating: {
      isValid: true,
      message: "",
    },
    description: {
      isValid: true,
      message: "",
    },
  });

  const readyToSend = () => {
    const data = postData as any;

    for (const key in validation) {
      if (!validation[key].isValid) {
        return false;
      }

      if (key in data && !data[key]) {
        return false;
      }
    }
    return true;
  };

  // event handlers
  function handleDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "image") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.result) {
            setPostData((prev) => ({
              ...prev,
              image: typeof reader.result === "string" ? reader.result : "",
            }));
          }
        };
      }
    } else {
      setPostData({ ...postData, [name]: value });
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (!value) {
      setValidation((prev) => ({
        ...prev,
        [name]: {
          isValid: false,
          message: "Поле обязательно для заполнения",
        },
      }));
    } else if (name === "pdf") {
      if (!isLink(value)) {
        setValidation((prev) => ({
          ...prev,
          [name]: {
            isValid: false,
            message: "Поле должно содержать ссылку",
          },
        }));
      }
    } else if (name === "rating") {
      if (Number(value) > 5) {
        setValidation((prev) => ({
          ...prev,
          [name]: {
            isValid: false,
            message: "Максимальное значение: 5",
          },
        }));
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", postData.name);
      formData.append("author", postData.author);
      formData.append("image", postData.image);
      formData.append("pdf", postData.pdf);
      formData.append("rating", String(postData.rating));
      formData.append("released", postData.released);
      formData.append("description", postData.description);

      const result = await api.sendRequest(
        [{
          method: "post",
          url: apiRoutes.books.post,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        "public"]
      );

      addToast({
        color: "success",
        title: result?.message ?? "Завяка отправлена!",
      });
      onSuccess();
    } catch (err: any) {
      console.error(err);
    } finally {
      onClose();
      setLoading(false);
    }
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Добавить книгу в библиотеку
        </ModalHeader>
        <ModalBody>
          <form
            className="
          flex flex-col gap-8
        "
            onSubmit={handleSubmit}
          >
            <Input
              color="secondary"
              label="Название"
              value={postData.name}
              name="name"
              placeholder="Например-Чистый код"
              isInvalid={!validation.name.isValid && !!validation.name.message}
              errorMessage={validation.name.message}
              onChange={handleDataChange}
              onFocus={() =>
                setValidation({
                  ...validation,
                  name: {
                    isValid: true,
                    message: "",
                  },
                })
              }
              onBlur={handleBlur}
            />
            <Input
              color="secondary"
              label="Автор"
              value={postData.author}
              name="author"
              placeholder="Введите имя автора"
              isInvalid={
                !validation.author.isValid && !!validation.author.message
              }
              errorMessage={validation.author.message}
              onChange={handleDataChange}
              onFocus={() =>
                setValidation({
                  ...validation,
                  author: {
                    isValid: true,
                    message: "",
                  },
                })
              }
              onBlur={handleBlur}
            />
            <Input
              name="image"
              label="Постер"
              color="secondary"
              type="file"
              isInvalid={!validation.image.isValid}
              errorMessage={validation.image.message}
              onChange={handleDataChange}
            />
            <Input
              value={postData.pdf}
              name="pdf"
              label="Ссылка на pdf"
              color="secondary"
              isInvalid={!validation.pdf.isValid}
              errorMessage={validation.pdf.message}
              type="url"
              onChange={handleDataChange}
              onFocus={() =>
                setValidation({
                  ...validation,
                  pdf: {
                    isValid: true,
                    message: "",
                  },
                })
              }
              onBlur={handleBlur}
            />
            <Input
              value={String(postData.rating ?? "")}
              name="rating"
              color="secondary"
              type="number"
              label="Рейтинг"
              placeholder="Введите рейтинг книги"
              isInvalid={!validation.rating.isValid}
              errorMessage={validation.rating.message}
              onChange={handleDataChange}
              onFocus={() =>
                setValidation({
                  ...validation,
                  rating: {
                    isValid: true,
                    message: "",
                  },
                })
              }
              onBlur={handleBlur}
            />
            <DateInput
              onChange={(value) =>
                setPostData((prev) => ({
                  ...prev,
                  released: `${value?.year}-${String(value?.day).padStart(
                    2,
                    "0"
                  )}-${String(value?.month).padStart(2, "0")}`,
                }))
              }
              color="secondary"
              label="Дата релиза"
            />
            <Textarea
              value={postData.description}
              name="description"
              color="secondary"
              label="Описание"
              placeholder="Краткое описание содержания книги"
              isInvalid={!validation.description.isValid}
              errorMessage={validation.description.message}
              onChange={handleDataChange}
              onFocus={() =>
                setValidation({
                  ...validation,
                  description: {
                    isValid: true,
                    message: "",
                  },
                })
              }
              onBlur={handleBlur}
            />
            <Button
              isDisabled={!readyToSend() || loading}
              type="submit"
              color="primary"
              variant="ghost"
            >
              {loading ? "Выполняется..." : "Отправить"}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
