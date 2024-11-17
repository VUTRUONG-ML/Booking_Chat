import { Button, Fieldset, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Field } from "../../components/ui/field";
import { PasswordInput } from "../../components/ui/password-input";  // Import PasswordInput

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);  // State to manage password visibility

  const submitHandler = () =>{

  };
  return (
    <VStack spacing="5px">
        <Fieldset.Root size="lg" maxW="md" color="black">
            <Fieldset.Content>
                <Field label="Email" id="email" isRequired>
                <Input
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Field>

                <Field label="Password" id="password" isRequired>
                    <PasswordInput
                        placeholder="Password"
                        defaultValue={password}
                        visible={visible}
                        onVisibleChange={setVisible}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Field>
            </Fieldset.Content>

            <Button 
                width="100%"
                style={{marginTop:15}}
                onClick={submitHandler}
            >
                Login
            </Button>

            <Button 
                bg="gray.500"
                width="100%"
                style={{marginTop:15}}
                onClick={() =>{
                  setEmail("guest@example.com");
                  setPassword("123456");
                }}
            >
                Get Guest User Credentials
            </Button>
        </Fieldset.Root>
    </VStack>
  );
}

export default UserLogin