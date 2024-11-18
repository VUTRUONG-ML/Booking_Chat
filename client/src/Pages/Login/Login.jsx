import "./Login.scss";
import { useEffect } from "react";
import { Container, Box, Text, Tabs  } from "@chakra-ui/react"
import UserLogin from "../../component/Authentication/UserLogin";
import Signup from "../../component/Authentication/Signup";
import { useNavigate  } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if(userInfo){
            navigate("/");
        }
    },[navigate]);
    return (<div className="login">
        <Container maxW="xl" centerContent>
            <Box
                d="flex"
                justifyContent="center"
                textAlign="center"
                p={3}
                bg={"white"}
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" color="black">BOOK A ROOM</Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" color="black">
                <Tabs.Root variant="enclosed"  fitted defaultValue={"tab-1"}>
                    <Tabs.List mb="1em" >
                        <Tabs.Trigger w="50%" value="login">Login</Tabs.Trigger> 
                        <Tabs.Trigger w="50%" value="signup">Sign Up</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="login"><UserLogin/></Tabs.Content>
                    <Tabs.Content value="signup"><Signup/></Tabs.Content>
                </Tabs.Root>
            </Box>
        </Container>;
    </div>
    )
}

export default Login