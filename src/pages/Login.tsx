import { useState, VFC } from "react";
import { useRouter } from "next/router";

import {
    Flex,
    Box,
    Input,
    Heading,
    Button,
    InputGroup,
    InputRightElement,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { Formik, FormikHelpers, Field, Form } from "formik";
import * as Yup from "yup";

import PassInput from "../components/input/PassInput";
import { useMessage } from "../hooks/useMessage";

interface Values {
    mail: string;
    password: string;
}
export const Login: VFC = () => {
    const [showPass, setShowPass] = useState(false);
    const router = useRouter();
    const showPassword = () => {
        setShowPass(!showPass);
    };
    const { showMessage } = useMessage();
    return (
        <Flex justify="center" align="center" height="100vh">
            <Box bg="white" width={400} p={5}>
                <Heading
                    as="h1"
                    textAlign="center"
                    mb={5}
                    fontFamily="mono"
                    color={"green.700"}
                >
                    MEDIGOL
                </Heading>
                <Box>
                    <Formik
                        initialValues={{ mail: "", password: "" }}
                        onSubmit={(values) => {
                            //alert(JSON.stringify(values, null, 2));
                            showMessage({
                                title: "ログインしました",
                                status: "success",
                            });
                            router.push(`/reserve/`);
                        }}
                        validationSchema={Yup.object({
                            mail: Yup.string()
                                .email("形式が間違っています")
                                .required("メールアドレスを入力してください。"),
                            password: Yup.string().required(
                                "パスワードを入力してください"
                            ),
                        })}
                    >
                        {({ handleSubmit, errors, touched }) => (
                            <Form>
                                <Box mb={3}>
                                    <Field
                                        as={Input}
                                        placeholder="email"
                                        name="mail"
                                        mb={1}
                                    ></Field>
                                    {errors.mail && touched.mail ? (
                                        <Alert status="error" borderRadius="md">
                                            <AlertIcon />
                                            <AlertDescription fontSize="xs">
                                                {errors.mail}
                                            </AlertDescription>
                                        </Alert>
                                    ) : null}
                                </Box>
                                <Box mb={5}>
                                    <InputGroup mb={1}>
                                        <Field
                                            as={Input}
                                            placeholder="password"
                                            type={
                                                showPass ? "text" : "password"
                                            }
                                            name="password"
                                        ></Field>
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
                                    {errors.password && touched.password ? (
                                        <Alert status="error" borderRadius="md">
                                            <AlertIcon />
                                            <AlertDescription fontSize="xs">
                                                {errors.password}
                                            </AlertDescription>
                                        </Alert>
                                    ) : null}
                                </Box>
                                <Button
                                    width="100%"
                                    bg={"green.700"}
                                    color="white"
                                    _hover={{ opacity: 0.7 }}
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Flex>
    );
};

export default Login;
