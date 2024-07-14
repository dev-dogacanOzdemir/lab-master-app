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
import classes from '../css/AuthenticationTitle.module.css';
import axios from 'axios';

export default function RegisterForm() {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçersiz email'),
            username: (value) => (value.length < 2 ? 'Kullanıcı adı en az 2 karakter olmalı' : null),
            password: (value) => (value.length < 6 ? 'Şifre en az 6 karakter olmalı' : null),
        },
    });

    async function handleSubmit(values: typeof form.values) {
        try {
            await axios.post("http://localhost:8080/api/user/save", {
                username: values.username,
                email: values.email,
                password: values.password,
            });
            alert("Kayıt Başarılı !");
            navigate('/login');
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div>
            <Container size={420} my={40}>
                <Title ta="center" className={classes.title}>
                    Kayıt Ol
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
                        <TextInput
                            mt="md"
                            label="Kullanıcı Adı"
                            placeholder="Kullanıcı Adı"
                            required
                            id="username"
                            {...form.getInputProps('username')}
                        />
                        <PasswordInput
                            label="Şifre"
                            placeholder="Şifre"
                            required
                            mt="md"
                            {...form.getInputProps('password')}
                        />

                        <Button fullWidth mt="xl" type="submit">
                            Kayıt Ol
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}
