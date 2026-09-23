import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import { Tab, Tabs } from "@heroui/tabs";
import { useState, type Key } from "react";
import { useI18n } from "@/shared/i18n";
import { Login, Register } from "./_components";
import { useGlobalStore } from "@/shared/store";

export function AuthModal() {
  const isOpen = useGlobalStore((state) => state.authModalOpen);
  const setIsOpen = useGlobalStore((state) => state.setAuthModalOpen);
  const [authType, setAuthType] = useState<string>("login");
  const { t } = useI18n();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
        <ModalContent>
          {() => (
            <>
              <ModalBody className="pt-8">
                <Tabs
                  selectedKey={authType}
                  onSelectionChange={(key: Key) => setAuthType(key as string)}
                  aria-label="Auth-options"
                  fullWidth
                >
                  <Tab
                    key={"login"}
                    title={t("auth.loginTab")}
                    className="h-full"
                  >
                    <Login />
                  </Tab>
                  <Tab
                    key={"register"}
                    title={t("auth.registerTab")}
                    className="h-full"
                  >
                    <Register setAuthType={setAuthType} />
                  </Tab>
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
