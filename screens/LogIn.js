import { gql, useMutation } from "@apollo/client";
import React, {useRef, useEffect} from "react";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthShared";
import { useForm } from "react-hook-form";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;


export default function Login({navigation}) {
    const {register, handleSubmit, setValue, watch} = useForm();
    const passwordRef = useRef();
    const onCompleted = async(data) => {
        const {
            login: {ok, token},
        } = data;
        if(ok) {
            await logUserIn(token);
        }
    };

    const [loginMutation, {loading}] = useMutation(LOGIN_MUTATION, {onCompleted});
    
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    }

    const onValid = (data) => {
        if(!loading) {
            loginMutation({
                variables: {
                    ...data,
                },
            });
        }
    };

    useEffect(() => {
        register("username", {
            required: true,
        });
        register("password", {
            required: true,
        });
    }, [register]);
    
    return (
        <AuthLayout>
            <TextInput
                placeholder="Username"
                returnKeyType="next"
                autoCapitalize="none"
                placeholderTextColor={"rgba(255,255,255,0.6)"}
                onSubmitEditing={()=> onNext(passwordRef)}
                onChangeText={(text) => setValue("username", text)}
            />
            <TextInput
                ref={passwordRef}
                placeholder="Password"
                secureTextEntry
                returnKeyType="done"
                lastOne={true}
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(text) => setValue("password", text)}
            />
            <AuthButton
                text="Log In"
                loading={loading}
                disabled={!watch("username") || !watch("password")}
                onPress={handleSubmit(onValid)}
            />
        </AuthLayout>
    );
}