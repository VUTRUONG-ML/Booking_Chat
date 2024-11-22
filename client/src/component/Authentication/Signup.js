
import { Button, Fieldset, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Field } from "../../components/ui/field";
import { PasswordInput } from "../../components/ui/password-input";  // Import PasswordInput
import { Toaster, toaster } from "../../components/ui/toaster"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [visible, setVisible] = useState(false);  // State to manage password visibility
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);  // State to manage confirm password visibility
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
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
        if (password != confirmPassword) {
            toaster.create({
                title: "Incorrect re-entered password ...",
                type: "warning",
                duration: 5000,
                isclosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/userClient",
                { name, email, password },
                config
            );
            toaster.create({
                title: "Registration Successful",
                type: "success",
                duration: 5000,
                isclosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);
            navigate("/chat");
        } catch (error) {
            toaster.create({
                title: "Error Occured!",
                description: error.response?.data?.message,
                type: "success",
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
                    <Field label="Name" id="first-name" >
                        <Input
                            name="name"
                            placeholder="Enter Your Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Field>

                    <Field label="Email" id="email" >
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Field>

                    <Field label="Password" id="password" >
                        <PasswordInput
                            placeholder="Password"
                            defaultValue={password}
                            visible={visible}
                            onVisibleChange={setVisible}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Field>

                    <Field label="Confirm Password" id="confirmPassword" >
                        <PasswordInput
                            placeholder="Enter Confirm Password"
                            defaultValue={confirmPassword}
                            visible={visibleConfirmPassword}
                            onVisibleChange={setVisibleConfirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Field>
                </Fieldset.Content>

                <Button
                    width="100%"
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                    isLoading={loading}
                >
                    Sign up
                </Button>
            </Fieldset.Root>
            <Toaster />
        </VStack>
    );
<<<<<<< HEAD
=======
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);  // State to manage password visibility
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);  // State to manage confirm password visibility
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async() =>{
    setLoading(true);
    if(!name || !email || !password || !confirmPassword){
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
    if(password !== confirmPassword){
        toaster.create({
          title: "Incorrect re-entered password ...",
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
            "/api/userClient", 
            {name, email, password},
            config
        );
        toaster.create({
            title: "Registration Successful",
            type: "success",
            duration: 5000,
            isclosable: true,
            position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));

        setLoading(false);
        navigate("/chat");
    } catch (error) {
        toaster.create({
            title: "Error Occured!",
            description: error.response?.data?.message,
            type: "warning",
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
                <Field label="Name" id="first-name" >
                <Input
                    name="name"
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                    required 
                />
                </Field>

                <Field label="Email" id="email" >
                <Input
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                </Field>

                <Field label="Password" id="password" >
                    <PasswordInput
                        placeholder="Password"
                        defaultValue={password}
                        visible={visible}
                        onVisibleChange={setVisible}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </Field>

                <Field label="Confirm Password" id="confirmPassword" >
                    <PasswordInput
                        placeholder="Enter Confirm Password"
                        defaultValue={confirmPassword}
                        visible={visibleConfirmPassword}
                        onVisibleChange={setVisibleConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                    />
                </Field>
            </Fieldset.Content>

            <Button 
                width="100%"
                style={{marginTop:15}}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign up
            </Button>
        </Fieldset.Root>
        <Toaster/>
    </VStack>
  );
>>>>>>> f053d58c39bee8c2ac3787c4b02e9ed74b43fb54
=======
>>>>>>> 70fb5e6f326fef3214b0202a80cc943fa97536de
};

export default Signup;
