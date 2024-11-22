import { Button, Fieldset, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Field } from "../../components/ui/field";
import { PasswordInput } from "../../components/ui/password-input";  // Import PasswordInput
import { Toaster,toaster } from "../../components/ui/toaster"
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const UserLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);  // State to manage password visibility
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {isLoggedIn, setIsLoggedIn} = ChatState();
  const submitHandler = async () =>{
    setLoading(true);
    if(!email || !password){
        toaster.create({
          title: "Please Fill all the feilds",
          type: "warning",
          duration: 5000,
          isclosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
    }

    try {
        const config ={
            headers:{
                "Content-type": "application/json",
            },
        };
        
        const {data} = await axios.post(
            "/api/userClient/login", 
            {email, password},
            config,
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
        toaster.create({
            title: "Login Successful",
            type: "success",
            duration: 5000,
            isclosable: true,
            position: "bottom",
        });
        setIsLoggedIn(true);
        setLoading(false);
        navigate("/");
    } catch (error) {
        toaster.create({
            title: "Incorrect email or password",
            description: error.response?.data?.message,
            type: "error",
            duration: 5000,
            isclosable: true,
            position: "bottom",
        });
        setLoading(false);
    }
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Field>

                <Field label="Password" id="password" isRequired>
                    <PasswordInput
                        placeholder="Password"
                        value={password}
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
                _loading={loading}
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
        <Toaster/>
    </VStack>
  );
}

export default UserLogin