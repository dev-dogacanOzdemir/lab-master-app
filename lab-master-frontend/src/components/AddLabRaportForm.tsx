import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Box, Group, Textarea, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Dropzone } from '@mantine/dropzone';
import apiClient from '../http-common';
import { useMantineTheme } from '@mantine/core';
import '../App.css';
import '@mantine/dates/styles.css';
import axios from 'axios';
interface Laborant {
    id: number;
    laborantFirstName: string;
    laborantLastName: string;
}

interface AddLabReportFormProps {
    onSuccess: () => void;
}

const AddLabReportForm: React.FC<AddLabReportFormProps> = ({ onSuccess }) => {
    const [laborants, setLaborants] = useState<Laborant[]>([]);
    const theme = useMantineTheme();

    const form = useForm({
        initialValues: {
            fileNumber: '',
            patientName: '',
            patientSurname: '',
            patientId: '',
            diagnosisTitle: '',
            diagnosisDetails: '',
            reportDate: null as Date | null,
            laborantId: '',
            reportImage: null as File | null,
        },
    });

    useEffect(() => {
        const fetchLaborants = async () => {
            try {
                const response = await apiClient.get<Laborant[]>('/laborants');
                setLaborants(response.data);
            } catch (error) {
                console.error('Error fetching laborants:', error);
            }
        };

        fetchLaborants();
    }, []);

    const handleSubmit = async (values: typeof form.values) => {
        const formData = new FormData();
        formData.append('fileNumber', values.fileNumber);
        formData.append('patientName', values.patientName);
        formData.append('patientSurname', values.patientSurname);
        formData.append('patientId', values.patientId);
        formData.append('diagnosisTitle', values.diagnosisTitle);
        formData.append('diagnosisDetails', values.diagnosisDetails);
        formData.append('reportDate', values.reportDate ? values.reportDate.toISOString().split('T')[0] : '');
        formData.append('laborantId', values.laborantId);
        if (values.reportImage) {
            formData.append('file', values.reportImage);
        }

        try {
            const response = await apiClient.post('/labreports', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200 || response.status === 201) {
                alert('Rapor başarıyla eklendi!');
                form.reset();
                onSuccess();
            } else {
                console.error('Rapor oluşturulurken bir hata oluştu:', response);
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
                        alert('Kaynak bulunamadı: İlgili kaynak bulunamadı, lütfen adresi kontrol edin.');
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
                    label="Dosya Numarası"
                    placeholder="Dosya Numarası"
                    {...form.getInputProps('fileNumber')}
                    required
                    mb="sm"
                    pattern="\d*"
                />
                <TextInput
                    label="Hasta Adı"
                    placeholder="Hasta Adı"
                    {...form.getInputProps('patientName')}
                    required
                    mb="sm"
                    pattern="[A-Za-zÇçĞğİıÖöŞşÜü]*"
                />
                <TextInput
                    label="Hasta Soyadı"
                    placeholder="Hasta Soyadı"
                    {...form.getInputProps('patientSurname')}
                    required
                    mb="sm"
                    pattern="[A-Za-zÇçĞğİıÖöŞşÜü]*"
                />
                <TextInput
                    label="T.C. Kimlik Numarası"
                    placeholder="T.C. Kimlik Numarası"
                    {...form.getInputProps('patientId')}
                    required
                    maxLength={11}
                    minLength={11}
                    mb="sm"
                    pattern="\d*"
                />
                <TextInput
                    label="Teşhis Başlığı"
                    placeholder="Teşhis Başlığı"
                    {...form.getInputProps('diagnosisTitle')}
                    required
                    mb="sm"
                />
                <Textarea
                    label="Teşhis Detayları"
                    placeholder="Teşhis Detayları"
                    {...form.getInputProps('diagnosisDetails')}
                    required
                    mb="sm"
                />
                <Select
                    label="Laborant"
                    placeholder="Laborant seçin"
                    data={laborants.map((laborant) => ({
                        value: laborant.id.toString(),
                        label: `${laborant.laborantFirstName} ${laborant.laborantLastName}`,
                    }))}
                    {...form.getInputProps('laborantId')}
                    required
                    mb="sm"
                />
                <DateInput
                    value={form.values.reportDate}
                    onChange={(date) => form.setFieldValue('reportDate', date)}
                    placeholder="Rapor Tarihi"
                    required
                    label="Rapor Tarihi"
                    mb="sm"
                    valueFormat="YYYY-MM-DD"
                    size="sm"
                    classNames={{ input: 'dateInputIcon' }}
                />
                <Box
                    style={{
                        border: `1px solid ${theme.colors.gray[4]}`,
                        borderRadius: theme.radius.sm,
                        padding: theme.spacing.md,
                        textAlign: 'center',
                    }}
                >
                    <Dropzone
                        onDrop={(files) => form.setFieldValue('reportImage', files[0])}
                        multiple={false}
                    >
                        <div>
                            Rapor Görselini Sürükleyip <b>Bırakın</b> veya <b>Tıklayın.</b>
                        </div>
                    </Dropzone>
                </Box>
                <Group mt="md">
                    <Button type="submit">Ekle</Button>
                </Group>
            </form>
        </Box>
    );
};

export default AddLabReportForm;
