<<<<<<< HEAD
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
=======
import { Button, Fieldset, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Field } from "../../components/ui/field";
import { PasswordInput } from "../../components/ui/password-input";  // Import PasswordInput
>>>>>>> fbc33f65b4282682bbd6f1bf96c196f34199f91b

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);  // State to manage password visibility
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);  // State to manage confirm password visibility

  const submitHandler = () =>{

  };
  return (
    <VStack spacing="5px">
        <Fieldset.Root size="lg" maxW="md" color="black">
            <Fieldset.Content>
                <Field label="Name" id="first-name" isRequired>
                <Input
                    name="name"
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                />
                </Field>

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

                <Field label="Confirm Password" id="confirmPassword" isRequired>
                    <PasswordInput
                        placeholder="Enter Confirm Password"
                        defaultValue={confirmPassword}
                        visible={visibleConfirmPassword}
                        onVisibleChange={setVisibleConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Field>
            </Fieldset.Content>

            <Button 
                width="100%"
                style={{marginTop:15}}
                onClick={submitHandler}
            >
                Sign up
            </Button>
        </Fieldset.Root>
    </VStack>
  );
};

export default Signup;
