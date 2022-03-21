import { useState, VFC } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

export const PassInput: VFC = () => {
    const [showPass, setShowPass] = useState(false);
    const showPassword = () => {
        setShowPass(!showPass);
    };
    return (
        <InputGroup>
            <Input
                placeholder="password"
                type={showPass ? "text" : "password"}
            ></Input>
            <InputRightElement
                children={{
                    ...(showPass ? (
                        <ViewIcon color="black.800" />
                    ) : (
                        <ViewOffIcon color="black.800" />
                    )),
                }}
                onClick={showPassword}
            />
        </InputGroup>
    );
};

export default PassInput;
