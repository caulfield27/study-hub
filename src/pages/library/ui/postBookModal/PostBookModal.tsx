import { useCallback, useState } from "react";
import styles from "./PostBookModal.module.css";
import { isLink, urlToBase64 } from "../../../../shared/utils/utils";
import { Button, TextField } from "@mui/material";
import { useLibrary } from "../../store/library.store";
import { Modal } from "../../../../shared/ui/Modal/Modal";
import type { IBook, IPostBookValidation } from "../../types/types";
import { sendRequest } from "../../../../shared/api/api.handlers";
import { apiRoutes } from "../../../../shared/api/api.routes";
import { useGlobalStore } from "../../../../shared/store/global.store";

interface Props {
  onSuccess: () => void;
}

export function PostBookModal({ onSuccess }: Props) {
  const { setPostModal } = useLibrary();
  const { openSnackbar } = useGlobalStore();
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
      isValid: false,
      message: "",
    },
    author: {
      isValid: false,
      message: "",
    },
    image: {
      isValid: false,
      message: "",
    },
    pdf: {
      isValid: false,
      message: "",
    },
    rating: {
      isValid: false,
      message: "",
    },
    released: {
      isValid: false,
      message: "",
    },
    description: {
      isValid: false,
      message: "",
    },
  });

  const readyToSend = useCallback(() => {
    for (const key in validation) {
      if (!validation[key].isValid) {
        return false;
      }
    }
    return true;
  }, [validation]);

  // event handlers
  function handleDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPostData({ ...postData, [e.target.name]: e.target.value });
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
    } else if (name === "image" || name === "pdf") {
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
      const formData = new FormData(e.currentTarget);
      const img = String(formData.get("image")) ?? "";
      let base64;
      try {
        base64 = await urlToBase64(img);
      } catch (_) {
        setValidation((prev) => ({
          ...prev,
          image: {
            isValid: false,
            message: "Неверный url",
          },
        }));
        return;
      }

      formData.set("image", String(base64));
      const result = await sendRequest({
        method: "post",
        url: apiRoutes.books.post,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPostModal(false);
      openSnackbar(result?.message ?? "Успешно добавлено!", "success");
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setPostModal(false);
      openSnackbar(err?.response?.data?.message ?? "Не удалось добавить книгу!", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal classes={styles.modal_content} onClose={() => setPostModal(false)}>
      <div className={styles.postModal_header}>
        <button onClick={() => setPostModal(false)}>&#215;</button>
      </div>

      <form className={styles.postModal_body} onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="name"
          variant="outlined"
          value={postData.name}
          onChange={handleDataChange}
          style={{ position: "relative" }}
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
          // onBlur={() => setValidation({ ...validation, name: true })}
        />
        {!validation.name.isValid && <span>{validation.name.message}</span>}
        <TextField
          name="author"
          label="author"
          variant="outlined"
          value={postData.author}
          onChange={handleDataChange}
          style={{ position: "relative" }}
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
          // onBlur={() => setValidation({ ...validation, author: true })}
        />
        {!validation.author.isValid && <span>{validation.author.message}</span>}
        {/* {postData.author === "" && validation.author && <span>required field</span>} */}
        <TextField
          name="image"
          label="poster src"
          variant="outlined"
          value={postData.image}
          onChange={handleDataChange}
          style={{ position: "relative" }}
          onFocus={() =>
            setValidation({
              ...validation,
              image: {
                isValid: true,
                message: "",
              },
            })
          }
          onBlur={handleBlur}
          // onBlur={() => setValidation({ ...validation, image: true })}
        ></TextField>
        {!validation.image.isValid && <span>{validation.image.message}</span>}
        {/* {postData.image === "" && validation.image && <span>required field</span>}
        {postData.image === ""
          ? ""
          : !isLink(postData.image) && validation.pdf && <span>field is not link</span>} */}
        <TextField
          name="pdf"
          label="pdf link"
          variant="outlined"
          value={postData.pdf}
          onChange={handleDataChange}
          style={{ position: "relative" }}
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
          // onBlur={() => setValidation({ ...validation, pdf: true })}
        />
        {!validation.pdf.isValid && <span>{validation.pdf.message}</span>}
        {/* {postData.pdf === "" && validation.pdf && <span>required field</span>}
        {postData.pdf === ""
          ? ""
          : !isLink(postData.pdf) && validation.pdf && <span>field is not link</span>} */}
        <TextField
          type="number"
          name="rating"
          label="rating"
          variant="outlined"
          value={postData.rating ?? ""}
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
          // onBlur={() => setValidation({ ...validation, rating: true })}
        />
        {!validation.rating.isValid && <span>{validation.rating.message}</span>}
        {/* {postData.rating === null && validation.rating && <span>required field</span>}
        {postData.rating === null
          ? ""
          : postData.rating > 5 &&
            validation.rating && <span>rating can&apos;t be higher then 5</span>} */}
        <TextField
          name="released"
          label="released"
          variant="outlined"
          value={postData.released}
          onChange={handleDataChange}
          onFocus={() =>
            setValidation({
              ...validation,
              released: {
                isValid: true,
                message: "",
              },
            })
          }
          onBlur={handleBlur}
          // onBlur={() => setValidation({ ...validation, released: true })}
        />
        {!validation.released.isValid && <span>{validation.released.message}</span>}
        {/* {postData.released === "" && validation.released && <span>required field</span>} */}
        <TextField
          label="Description"
          multiline
          rows={4}
          value={postData.description}
          name="description"
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
          // onBlur={() => setValidation({ ...validation, description: true })}
        />
        {!validation.description.isValid && <span>{validation.description.message}</span>}
        {/* {postData.description === "" && validation.description && <span>required field</span>} */}
        <Button
          disabled={!readyToSend() || loading}
          variant="contained"
          color="success"
          type="submit"
        >
          {loading ? "Добавляется..." : "Добавить в бибилиотеку"}
        </Button>
      </form>
    </Modal>
  );
}
