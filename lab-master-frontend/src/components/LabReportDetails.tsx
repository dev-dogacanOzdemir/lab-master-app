import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Text, Loader } from '@mantine/core';
import apiClient from '../http-common';

interface Laborant {
    id: number;
    laborantFirstName: string;
    laborantLastName: string;
}

interface LabReport {
    id: number;
    fileNumber: string;
    patientName: string;
    patientSurname: string;
    patientId: string;
    diagnosisTitle: string;
    diagnosisDetails: string;
    reportDate: string;
    reportImage?: string;
    laborant?: Laborant;
}

const LabReportDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [labReport, setLabReport] = useState<LabReport | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchLabReport();
    }, [id]);

    const fetchLabReport = async () => {
        try {
            const response = await apiClient.get(`/labreports/${id}`);
            setLabReport(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Rapor detayları alınırken bir hata oluştu:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!labReport) {
        return <Text>Rapor bulunamadı.</Text>;
    }
    return (
        <Card shadow="sm" padding="lg">
            <Text style={{ fontSize: '35px' }} mb="md">
                <b>Rapor Detayları</b>
            </Text>
            <Text><b>Dosya Numarası:</b> {labReport.fileNumber}</Text>
            <Text><b>Hasta Adı:</b> {labReport.patientName}</Text>
            <Text><b>Hasta Soyadı:</b> {labReport.patientSurname}</Text>
            <Text><b>T.C. Kimlik Numarası:</b> {labReport.patientId}</Text>
            <Text><b>Teşhis Başlığı:</b> {labReport.diagnosisTitle}</Text>
            <Text><b>Teşhis Detayları:</b> {labReport.diagnosisDetails}</Text>
            <Text><b>Rapor Tarihi:</b> {labReport.reportDate}</Text>
            {labReport.laborant ? (
                <Text><b>Laborant:</b> {labReport.laborant.laborantFirstName} {labReport.laborant.laborantLastName}</Text>
            ) : (
                <Text>Laborant bilgisi bulunamadı</Text>
            )}
            {labReport.reportImage ? (
                <div>
                    <Text><b>Rapor Görseli:</b></Text>
                    <img src={`data:image/jpeg;base64,${labReport.reportImage}`} alt="Rapor Görseli" />
                </div>
            ) : (
                <Text>Rapor görseli bulunamadı</Text>
            )}
        </Card>
    );
};

export default LabReportDetails;
