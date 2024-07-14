import React from 'react';
import {
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Container,
    Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from '../css/AuthenticationTitle.module.css';

interface LoginFormProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçersiz email'),
            password: (value) => (value.length < 6 ? 'Şifre en az 6 karakter olmalı' : null),
        },
    });

    async function handleSubmit(values: typeof form.values) {
        try {
            const response = await axios.post("http://localhost:8080/api/user/login", {
                email: values.email,
                password: values.password,
            });

            console.log("Response:", response.data);

            if (response.data && response.data.status) {
                localStorage.setItem('token', response.data.token); // Oturum bilgilerini sakla
                setIsAuthenticated(true); // Oturum durumunu güncelle
                alert(response.data.message);
                navigate('/home'); // Başarılı giriş sonrası yönlendirme
            } else {
                alert("Giriş Başarısız. Lütfen bilgilerinizi kontrol edin.");
            }
        } catch (err) {
            console.error("Giriş hatası:", err);
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    }

    return (
        <div>
            <Container size={420} my={40}>
                <Title ta="center" className={classes.title}>
                    Giriş Yap
                </Title>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <TextInput
                            label="Email"
                            id="email"
                            placeholder="you@labmaster.dev"
                            required
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput
                            label="Şifre"
                            placeholder="Şifre"
                            required
                            mt="md"
                            {...form.getInputProps('password')}
                        />

                        <Button fullWidth mt="xl" type="submit">
                            Giriş Yap
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}

export default LoginForm;