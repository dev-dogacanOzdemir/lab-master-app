import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Box, Group } from '@mantine/core';
import apiClient from '../http-common';
import axios from 'axios';
interface UpdateLaborantProps {
    laborant: {
        id: number;
        laborantFirstName: string;
        laborantLastName: string;
        hospitalId: string;
    };
    onUpdate: () => void;
    onCancel: () => void;
}

const UpdateLaborant: React.FC<UpdateLaborantProps> = ({ laborant, onUpdate, onCancel }) => {
    const form = useForm({
        initialValues: {
            laborantFirstName: laborant.laborantFirstName,
            laborantLastName: laborant.laborantLastName,
            hospitalId: laborant.hospitalId,
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        const newLaborant = {
            laborantFirstName: values.laborantFirstName,
            laborantLastName: values.laborantLastName,
            hospitalId: values.hospitalId,
        };

        try {
            const response = await apiClient.post('/laborants', newLaborant);
            if (response.status === 200 || response.status === 201) {
                alert('Laborant başarıyla eklendi!');
                form.reset();
            } else {
                console.error('Laborant eklenirken bir hata oluştu:', response);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Sunucudan bir cevap alındı ancak durum kodu 2xx aralığında değil
                switch (error.response?.status) {
                    case 400:
                        alert('Hatalı istek: Lütfen girdiğiniz bilgileri kontrol edin.');
                        break;
                    case 401:
                        alert('Yetkisiz erişim: Bu işlemi yapmak için giriş yapmalısınız.');
                        break;
                    case 403:
                        alert('Erişim engellendi: Bu işlemi yapma yetkiniz bulunmuyor.');
                        break;
                    case 404:
                        alert('Bulunamadı: İlgili kaynak bulunamadı, lütfen adresi kontrol edin.');
                        break;
                    case 408:
                        alert('Zaman aşımı: İstek zaman aşımına uğradı, lütfen tekrar deneyin.');
                        break;
                    default:
                        alert('Bilinmeyen bir hata oluştu: Lütfen tekrar deneyin.');
                }
            } else {
                console.error('Beklenmedik bir hata oluştu:', error);
                alert('Beklenmedik bir hata oluştu: Lütfen tekrar deneyin.');
            }
        }
    };

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Adı"
                    placeholder="Adı"
                    {...form.getInputProps('laborantFirstName')}
                    required
                    mb="sm"
                    pattern="[A-Za-zÇçĞğİıÖöŞşÜü]*"
                />
                <TextInput
                    label="Soyadı"
                    placeholder="Soyadı"
                    {...form.getInputProps('laborantLastName')}
                    required
                    mb="sm"
                    pattern="[A-Za-zÇçĞğİıÖöŞşÜü]*"
                />
                <TextInput
                    label="Hastane ID"
                    placeholder="Hastane ID"
                    {...form.getInputProps('hospitalId')}
                    required
                    mb="sm"
                    maxLength={7}
                    minLength={7}
                    pattern="\d*"
                />
                <Group mt="md">
                    <Button type="submit">Güncelle</Button>
                    <Button variant="outline" onClick={onCancel}>İptal</Button>
                </Group>
            </form>
        </Box>
    );
};

export default UpdateLaborant;
