import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";

const Auth = () => {

  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")

  const handleLogin = async () => {
    
  }

  const handleSignUp = async () => {

  }

  return (
    <>
      <div className="h-[100vh] w-[100vw] flex items-center justify-center">
        <div className="h-[80vh] w-[80vw] border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
            <div className="flex flex-col gap-10 items-center justify-center">
                <div className="flex items-center justify-center flex-col">
                    <div className="flex items-center justify-center">
                        <h1 className="text-5xl font-bold md:text-6xl">
                            Welcome
                        </h1>
                    </div>
                    <p className="font-medium text-center mt-4">Fill in the details to get started with this amzing chat app!
                    </p>
                </div>
                <div className="flex items-center justify-center w-full">
                  <Tabs className="w-3/4">
                    <TabsList className="bg-transparent rounded-none w-full flex justify-between">
                      <TabsTrigger value="login"
                      className="data-[state=active]:bg-transparent test-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-black p-3 transition-all duration-300"
                      >
                        Login
                      </TabsTrigger>
                      <TabsTrigger value="signup"
                      className="data-[state=active]:bg-transparent test-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-black p-3 transition-all duration-300"
                      >
                        Signup
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                      <Input 
                        placeholder="Email"
                        type="email"
                        className="rounded-full p-6"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                       <Input 
                        placeholder="Password"
                        type="password"
                        className="rounded-full p-6"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                      <Button
                        className="rounded-full p-6"
                        onClick={handleLogin}
                      >
                        Login
                      </Button>
                    </TabsContent>
                    <TabsContent className="flex flex-col gap-5" value="signup">
                      <Input 
                        placeholder="Email"
                        type="email"
                        className="rounded-full p-6"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                       <Input 
                        placeholder="Password"
                        type="password"
                        className="rounded-full p-6"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                      <Input 
                        placeholder="Confirm Password"
                        type="password"
                        className="rounded-full p-6"
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                      />
                      <Button
                        className="rounded-full p-6"
                        onClick={handleSignUp}
                      >
                        Sign Up
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>
            </div>
            <div className="hidden xl:flex justify-center items-center">
              <img src="../src/assets/welcome.jpg" className="h-[80vh] w-[80vw] rounded-r-2xl" />
            </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
