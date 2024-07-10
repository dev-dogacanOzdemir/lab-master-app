import React, { useState, useEffect } from 'react';
import { TextInput, Button, Box, Group, Textarea, Select } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { DateInput } from '@mantine/dates';
import { Dropzone } from '@mantine/dropzone';
import apiClient from '../http-common';
import { useMantineTheme } from '@mantine/core';
import '../App.css'
import '@mantine/dates/styles.css'
interface Laborant {
    id: number;
    laborantFirstName: string;
    laborantLastName: string;
}



const AddLabReportForm: React.FC = () => {
    const [fileNumber, setFileNumber] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientSurname, setPatientSurname] = useState('');
    const [patientId, setPatientId] = useState('');
    const [diagnosisTitle, setDiagnosisTitle] = useState('');
    const [diagnosisDetails, setDiagnosisDetails] = useState('');
    const [reportDate, setReportDate] = useState<Date | null>(null);
    const [laborant, setLaborant] = useState<Laborant | null>(null);
    const [reportImage, setReportImage] = useState<File | null>(null);
    const [laborants, setLaborants] = useState<Laborant[]>([]);

    const theme = useMantineTheme();

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
        formData.append('laborantId', laborant ? laborant.id.toString() : '');
        if (reportImage) {
            formData.append('file', reportImage);
        }

        try {
            const response = await apiClient.post('/labreports', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                alert('Rapor başarıyla eklendi!');
                setPatientId('');
                setPatientName('');
                setPatientSurname('');
                setFileNumber('');
                setDiagnosisDetails('');
                setDiagnosisTitle('');
                setReportDate(null);
                setReportImage(null);
                setLaborant(null);
            } else {
                console.error('Rapor oluşturulurken bir hata oluştu: ' + response);
            }
        } catch (error) {
            console.error('Rapor eklenirken bir hata oluştu: ' + error);
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

                <Select
                    label="Laborant"
                    placeholder="Laborant seçin"
                    data={laborants.map(laborant => ({
                        value: laborant.id.toString(),
                        label: `${laborant.laborantFirstName} ${laborant.laborantLastName}`,
                    }))}
                    value={laborant ? laborant.id.toString() : null}
                    onChange={(value) => {
                        const selectedLaborant = laborants.find(l => l.id.toString() === value);
                        setLaborant(selectedLaborant || null);
                    }}
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
                    size='sm'
                    classNames={{ input: 'dateInputIcon' }}
                />
                <Box style={{
                    border: `1px solid ${theme.colors.gray[4]}`,
                    borderRadius: theme.radius.sm,
                    padding: theme.spacing.md,
                    textAlign: 'center',
                }}>
                    <Dropzone onDrop={(files) => setReportImage(files[0])} multiple={false}>
                        <div>Rapor Görselini Sürükleyip<b> Bırakın </b> veya <b>Tıklayın.</b></div>
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
