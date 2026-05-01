import { Tabs, Tab } from "@heroui/tabs";
import { AuthContainer, Login, Register } from "./_components";
import { useState, type Key } from "react";
import { useI18n } from "@/shared/i18n";

const Auth = () => {
  const { t } = useI18n();
  const [authType, setAuthType] = useState("login");
  return (
    <div>
      <Tabs
        selectedKey={authType}
        onSelectionChange={(key: Key) => setAuthType(key as string)}
        aria-label="Auth-options"
      >
        <Tab key={"login"} title={t("auth.loginTab")}>
          <AuthContainer title={t("auth.loginTab")}>
            <Login />
          </AuthContainer>
        </Tab>
        <Tab key={"register"} title={t("auth.registerTab")}>
          <AuthContainer title={t("auth.registerTitle")}>
            <Register setAuthType={setAuthType}/>
          </AuthContainer>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Auth;
