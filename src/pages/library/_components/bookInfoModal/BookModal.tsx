import { useLibrary } from "../../Library.store";
import { base_url } from "@/shared/api/api.config";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import type { Props } from "./BookModal.types";
import styles from './BookModal.module.css';

export function BooksModal({ isOpen, onClose }: Props) {
  const { currentBook } = useLibrary();
  const isMobile = window.innerWidth <= 768;

  return (
    <Modal size={isMobile ? "full" : "xl"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {currentBook?.name ?? ""}
            </ModalHeader>
            <ModalBody className="flex flex-row gap-3">
              <div className="flex flex-col items-start">
                <img
                  src={`${base_url}/${currentBook?.image}`}
                  alt={currentBook?.name}
                  className="w-[200px] md:w-full"
                />
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 items-center">
                    <span className="font-bold">Рейтинг: </span>
                    <span>{currentBook?.rating}</span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button className="relative bg-transparent border-0 cursor-pointer">
                      <span className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover:block">
                        Add to favorites
                      </span>
                      <span className="group-hover:text-red-500">❤️</span>
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">Author:</span>
                  <span>{currentBook?.author}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">Released:</span>
                  <span>{currentBook?.released}</span>
                </div>
                <span className="font-bold">Description:</span>
                <div className={styles.desc}>
                  <p>{currentBook?.description}</p>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
