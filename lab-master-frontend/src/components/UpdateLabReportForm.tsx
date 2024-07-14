import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Box, Group, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import apiClient from '../http-common';
import axios from 'axios';
interface UpdateLabReportFormProps {
    labReport: {
        id: number;
        fileNumber: string;
        patientName: string;
        patientSurname: string;
        patientId: string;
        diagnosisTitle: string;
        diagnosisDetails: string;
        reportDate: string;
        laborantId: number; // laborantId alanını ekleyin
    };
    onUpdate: () => void;
    onCancel: () => void;
}

const UpdateLabReportForm: React.FC<UpdateLabReportFormProps> = ({ labReport, onUpdate, onCancel }) => {
    const form = useForm({
        initialValues: {
            id: labReport.id,
            fileNumber: labReport.fileNumber,
            patientName: labReport.patientName,
            patientSurname: labReport.patientSurname,
            patientId: labReport.patientId,
            diagnosisTitle: labReport.diagnosisTitle,
            diagnosisDetails: labReport.diagnosisDetails,
            reportDate: labReport.reportDate ? new Date(labReport.reportDate) : null,
            laborantId: labReport.laborantId // laborantId değerini ekleyin
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        const formData = new FormData();
        formData.append('id', values.id.toString());
        formData.append('fileNumber', values.fileNumber);
        formData.append('patientName', values.patientName);
        formData.append('patientSurname', values.patientSurname);
        formData.append('patientId', values.patientId);
        formData.append('diagnosisTitle', values.diagnosisTitle);
        formData.append('diagnosisDetails', values.diagnosisDetails);
        formData.append('reportDate', values.reportDate ? values.reportDate.toISOString().split('T')[0] : ''); // YYYY-MM-DD
        formData.append('laborantId', values.laborantId.toString());

        try {
            const response = await apiClient.put(`/labreports/${values.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                alert('Rapor başarıyla güncellendi!');
                onUpdate();
            } else {
                console.error('Rapor güncellenirken bir hata oluştu: ' + response);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
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
                <DateInput
                    value={form.values.reportDate}
                    onChange={(date) => form.setFieldValue('reportDate', date || new Date())}
                    placeholder="Rapor Tarihi"
                    required
                    label="Rapor Tarihi"
                    mb="sm"
                    valueFormat="YYYY-MM-DD"
                />
                <Group mt="md">
                    <Button type="submit">Güncelle</Button>
                    <Button variant="outline" onClick={onCancel}>İptal</Button>
                </Group>
            </form>
        </Box>
    );
};

export default UpdateLabReportForm;
