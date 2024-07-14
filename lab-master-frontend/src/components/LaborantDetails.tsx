import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Text, Loader, Table, Button, ScrollArea } from '@mantine/core';
import apiClient from '../http-common';
import AddLabReport from '../components/AddLabRaportForm';
import '../App.css';

interface LabReport {
    id: number;
    fileNumber: string;
    patientName: string;
    patientSurname: string;
    patientId: string;
    diagnosisTitle: string;
    diagnosisDetails: string;
    reportDate: string;
}

interface Laborant {
    id: number;
    laborantFirstName: string;
    laborantLastName: string;
    hospitalId: string;
}

const LaborantDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [laborant, setLaborant] = useState<Laborant | null>(null);
    const [labReports, setLabReports] = useState<LabReport[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [addingReport, setAddingReport] = useState<boolean>(false);

    useEffect(() => {
        fetchLaborant();
        fetchLabReports();
    }, [id]);

    const fetchLaborant = async () => {
        try {
            const response = await apiClient.get(`/laborants/${id}`);
            setLaborant(response.data);
        } catch (error) {
            console.error('Laborant detayları alınırken bir hata oluştu:', error);
        }
    };

    const fetchLabReports = async () => {
        try {
            const response = await apiClient.get(`/labreports/laborant/${id}`);
            setLabReports(response.data);
        } catch (error) {
            console.error('Laborant raporları alınırken bir hata oluştu:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddReportSuccess = () => {
        setAddingReport(false);
        fetchLabReports();
    };

    if (loading) {
        return <Loader />;
    }

    if (!laborant) {
        return <Text>Laborant bulunamadı.</Text>;
    }

    return (
        <Card shadow="sm" padding="lg">
            <Text style={{ fontSize: '35px' }} mb="md">
                <b> Laborant Detayları</b>
            </Text>
            <Text><b>Adı:</b> {laborant.laborantFirstName}</Text>
            <Text><b>Soyadı:</b> {laborant.laborantLastName}</Text>
            <Text><b>Hastane ID:</b> {laborant.hospitalId}</Text>

            <Text style={{ fontSize: '25px' }} mt="lg" mb="md">
                <b>Raporlar</b>
            </Text>
            <ScrollArea style={{ maxHeight: 400 }}>
                {labReports.length > 0 ? (
                    <Table highlightOnHover withTableBorder withColumnBorders >
                        <Table.Thead style={{ backgroundColor: '#f5f5f5' }}>
                            <Table.Tr>
                                <Table.Td style={{ textAlign: 'center' }}>Dosya Numarası</Table.Td>
                                <Table.Td style={{ textAlign: 'center' }}>Hasta Adı</Table.Td>
                                <Table.Td style={{ textAlign: 'center' }}>Hasta Soyadı</Table.Td>
                                <Table.Td style={{ textAlign: 'center' }}>Teşhis Başlığı</Table.Td>
                                <Table.Td style={{ textAlign: 'center' }}>Teşhis Detayları</Table.Td>
                                <Table.Td style={{ textAlign: 'center' }}>Rapor Tarihi</Table.Td>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {labReports.map((report) => (
                                <Table.Tr key={report.id}>
                                    <Table.Td style={{ textAlign: 'center' }}>{report.fileNumber}</Table.Td>
                                    <Table.Td style={{ textAlign: 'center' }}>{report.patientName}</Table.Td>
                                    <Table.Td style={{ textAlign: 'center' }}>{report.patientSurname}</Table.Td>
                                    <Table.Td style={{ textAlign: 'center' }}>{report.diagnosisTitle}</Table.Td>
                                    <Table.Td style={{ textAlign: 'center' }}>{report.diagnosisDetails}</Table.Td>
                                    <Table.Td style={{ textAlign: 'center' }}>{report.reportDate}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                ) : (
                    <Text>Bu laboranta ait rapor bulunmamaktadır.</Text>
                )}
            </ScrollArea>
            {addingReport ? (
                <AddLabReport onSuccess={handleAddReportSuccess} />
            ) : (
                <Button mt="lg" onClick={() => setAddingReport(true)}>
                    Yeni Rapor Ekle
                </Button>
            )}
        </Card>
    );
};

export default LaborantDetails;
