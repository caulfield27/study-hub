import { Tabs, Tab } from "@heroui/tabs";
import { AuthContainer, Login, Register } from "./_components";
import { useState, type Key } from "react";

const Auth = () => {
  const [authType, setAuthType] = useState("login");
  return (
    <div>
      <Tabs
        selectedKey={authType}
        onSelectionChange={(key: Key) => setAuthType(key as string)}
        aria-label="Auth-options"
      >
        <Tab key={"login"} title="Вход">
          <AuthContainer title="Вход">
            <Login />
          </AuthContainer>
        </Tab>
        <Tab key={"register"} title="Регистрация">
          <AuthContainer title="Регистация">
            <Register setAuthType={setAuthType}/>
          </AuthContainer>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Auth;
