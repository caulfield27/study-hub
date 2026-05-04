import { useState } from "react";
import { isLink } from "@/shared/utils/utils";
import type { IPostBookValidation } from "../../Library.types";
import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import type { PostData, Props } from "./PostBookModal.types";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui//button";
import { DateInput } from "@heroui/date-input";
import { addToast } from "@heroui/toast";
import { useI18n } from "@/shared/i18n";

export function PostBookModal({ onSuccess, isOpen, onClose }: Props) {
  const { t } = useI18n();
  const [postData, setPostData] = useState<PostData>({
    name: "",
    author: "",
    image: "",
    pdf: "",
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
          message: t("auth.required"),
        },
      }));
    } else if (name === "pdf") {
      if (!isLink(value)) {
        setValidation((prev) => ({
          ...prev,
          [name]: {
            isValid: false,
            message: t("library.invalidLink"),
          },
        }));
      }
    } else if (name === "rating") {
      if (Number(value) > 5) {
        setValidation((prev) => ({
          ...prev,
          [name]: {
            isValid: false,
            message: t("library.maxRating"),
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
      formData.append("released", postData.released);
      formData.append("description", postData.description);

      const result = await api.sendRequest([
        {
          method: "post",
          url: apiRoutes.books.post,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        "public",
      ]);

      addToast({
        color: "success",
        title: result?.message ?? t("library.requestSent"),
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
    <Modal
      classNames={{
        backdrop: "z-[100]",
        wrapper: "z-[101]",
      }}
      onClose={onClose}
      isOpen={isOpen}
      size={window.innerWidth <= 768 ? "full" : "xl"}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {t("library.addBookTitle")}
        </ModalHeader>
        <ModalBody className="max-md:overflow-scroll max-md:pb-8">
          <form
            className="
          flex flex-col gap-8
        "
            onSubmit={handleSubmit}
          >
            <Input
              color="secondary"
              label={t("library.bookName")}
              value={postData.name}
              name="name"
              placeholder={t("library.sampleBookName")}
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
              classNames={{
                input:
                  "placeholder:text-(--muted-foreground) text-(--foreground)",
                inputWrapper: [
                  "bg-(--surface)",
                  "border border-(--border-color)",
                  "focus-within:ring-2 focus-within:ring-(--primary-color)",
                ],
                label: "text-(--foreground)",
              }}
            />
            <Input
              color="secondary"
              label={t("library.authorName")}
              value={postData.author}
              name="author"
              placeholder={t("library.enterAuthorName")}
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
              classNames={{
                input:
                  "placeholder:text-(--muted-foreground) text-(--foreground)",
                inputWrapper: [
                  "bg-(--surface)",
                  "border border-(--border-color)",
                  "focus-within:ring-2 focus-within:ring-(--primary-color)",
                ],
                label: "text-(--foreground)",
              }}
            />
            <Input
              name="image"
              label={t("library.poster")}
              color="secondary"
              type="file"
              isInvalid={!validation.image.isValid}
              errorMessage={validation.image.message}
              onChange={handleDataChange}
              classNames={{
                input:
                  "placeholder:text-(--muted-foreground) text-(--foreground)",
                inputWrapper: [
                  "bg-(--surface)",
                  "border border-(--border-color)",
                  "focus-within:ring-2 focus-within:ring-(--primary-color)",
                ],
                label: "text-(--foreground)",
              }}
            />
            <Input
              value={postData.pdf}
              name="pdf"
              label={t("library.pdfLink")}
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
              classNames={{
                input:
                  "placeholder:text-(--muted-foreground) text-(--foreground)",
                inputWrapper: [
                  "bg-(--surface)",
                  "border border-(--border-color)",
                  "focus-within:ring-2 focus-within:ring-(--primary-color)",
                ],
                label: "text-(--foreground)",
              }}
            />
            <DateInput
              onChange={(value) =>
                setPostData((prev) => ({
                  ...prev,
                  released: `${value?.year}-${String(value?.day).padStart(
                    2,
                    "0",
                  )}-${String(value?.month).padStart(2, "0")}`,
                }))
              }
              color="secondary"
              label={t("library.releaseDate")}
              classNames={{
                input:
                  "placeholder:text-(--muted-foreground) text-(--foreground)",
                inputWrapper: [
                  "bg-(--surface)",
                  "border border-(--border-color)",
                  "focus-within:ring-2 focus-within:ring-(--primary-color)",
                ],
                label: "text-(--foreground)",
              }}
            />
            <Textarea
              value={postData.description}
              name="description"
              color="secondary"
              label={t("library.descriptionLabel")}
              placeholder={t("library.descriptionPlaceholder")}
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
              classNames={{
                input:
                  "placeholder:text-(--muted-foreground) text-(--foreground)",
                inputWrapper: [
                  "bg-(--surface)",
                  "border border-(--border-color)",
                  "focus-within:ring-2 focus-within:ring-(--primary-color)",
                ],
                label: "text-(--foreground)",
              }}
            />
            <Button
              isDisabled={!readyToSend() || loading}
              type="submit"
              color="primary"
              variant="ghost"
            >
              {loading ? t("library.inProgress") : t("common.submit")}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
