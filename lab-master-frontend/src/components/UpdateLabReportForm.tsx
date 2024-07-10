// UpdateLabReportForm.tsx

import React, { useState } from 'react';
import { TextInput, Button, Box, Group, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Dropzone } from '@mantine/dropzone';
import apiClient from '../http-common';

interface UpdateLabReportFormProps {
    labReport: any;
    onUpdate: () => void;
    onCancel: () => void;
}

const UpdateLabReportForm: React.FC<UpdateLabReportFormProps> = ({ labReport, onUpdate, onCancel }) => {
    const [fileNumber, setFileNumber] = useState(labReport.fileNumber);
    const [patientName, setPatientName] = useState(labReport.patientName);
    const [patientSurname, setPatientSurname] = useState(labReport.patientSurname);
    const [patientId, setPatientId] = useState(labReport.patientId);
    const [diagnosisTitle, setDiagnosisTitle] = useState(labReport.diagnosisTitle);
    const [diagnosisDetails, setDiagnosisDetails] = useState(labReport.diagnosisDetails);
    const [reportDate, setReportDate] = useState<Date | null>(new Date(labReport.reportDate));

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('fileNumber', fileNumber);
        formData.append('patientName', patientName);
        formData.append('patientSurname', patientSurname);
        formData.append('patientId', patientId);
        formData.append('diagnosisTitle', diagnosisTitle);
        formData.append('diagnosisDetails', diagnosisDetails);
        formData.append('reportDate', reportDate ? reportDate.toISOString().split('T')[0] : ''); // YYYY-MM-DD formatı
        try {
            const response = await apiClient.put(`/labreports/${labReport.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                alert('Rapor başarıyla güncellendi!');
                onUpdate();
            } else {
                console.error('Rapor güncellenirken bir hata oluştu: ' + response);
            }
        } catch (error) {
            console.error('Rapor güncellenirken bir hata oluştu: ' + error);
        }
    };

    return (
        <Box mx="auto">
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Dosya Numarası"
                    placeholder="Dosya Numarası"
                    value={fileNumber}
                    onChange={(e) => setFileNumber(e.target.value)}
                    required
                    mb="sm"
                    pattern="\d*"
                />
                <TextInput
                    label="Hasta Adı"
                    placeholder="Hasta Adı"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    mb="sm"
                    pattern="[A-Za-zÇçĞğİıÖöŞşÜü]*"
                />
                <TextInput
                    label="Hasta Soyadı"
                    placeholder="Hasta Soyadı"
                    value={patientSurname}
                    onChange={(e) => setPatientSurname(e.target.value)}
                    required
                    mb="sm"
                    pattern="[A-Za-zÇçĞğİıÖöŞşÜü]*"
                />
                <TextInput
                    label="T.C. Kimlik Numarası"
                    placeholder="T.C. Kimlik Numarası"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    required
                    maxLength={11}
                    minLength={11}
                    mb="sm"
                    pattern="\d*"
                />
                <TextInput
                    label="Teşhis Başlığı"
                    placeholder="Teşhis Başlığı"
                    value={diagnosisTitle}
                    onChange={(e) => setDiagnosisTitle(e.target.value)}
                    required
                    mb="sm"
                />
                <Textarea
                    label="Teşhis Detayları"
                    placeholder="Teşhis Detayları"
                    value={diagnosisDetails}
                    onChange={(e) => setDiagnosisDetails(e.target.value)}
                    required
                    mb="sm"
                />
                <DateInput
                    value={reportDate}
                    onChange={setReportDate}
                    placeholder="Rapor Tarihi"
                    required
                    label="Rapor Tarihi"
                    mb="sm"
                    valueFormat='YYYY-MM-DD'
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
