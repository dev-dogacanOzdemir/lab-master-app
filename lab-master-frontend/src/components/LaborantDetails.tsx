import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Text, Loader, Table, Button } from '@mantine/core';
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
            <div className="table-wrapper">
                {labReports.length > 0 ? (
                    <Table className="table">
                        <thead>
                            <tr>
                                <th>Dosya Numarası</th>
                                <th>Hasta Adı</th>
                                <th>Hasta Soyadı</th>
                                <th>Teşhis Başlığı</th>
                                <th>Teşhis Detayları</th>
                                <th>Rapor Tarihi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {labReports.map((report) => (
                                <tr key={report.id}>
                                    <td>{report.fileNumber}</td>
                                    <td>{report.patientName}</td>
                                    <td>{report.patientSurname}</td>
                                    <td>{report.diagnosisTitle}</td>
                                    <td>{report.diagnosisDetails}</td>
                                    <td>{report.reportDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <Text>Bu laboranta ait rapor bulunmamaktadır.</Text>
                )}
            </div>
            {addingReport ? (
                <AddLabReport />

            ) : (
                <Button mt="lg" onClick={() => setAddingReport(true)}>
                    Yeni Rapor Ekle
                </Button>
            )}
        </Card>
    );
};

export default LaborantDetails;
