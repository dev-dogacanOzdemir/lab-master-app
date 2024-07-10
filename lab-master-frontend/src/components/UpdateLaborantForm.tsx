import React, { useState, useEffect } from 'react';
import { TextInput, Button, Box, Group } from '@mantine/core';
import apiClient from '../http-common';

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
    const [laborantFirstName, setLaborantFirstName] = useState(laborant.laborantFirstName);
    const [laborantLastName, setLaborantLastName] = useState(laborant.laborantLastName);
    const [hospitalId, setHospitalId] = useState(laborant.hospitalId);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const updatedLaborant = {
            laborantFirstName: laborantFirstName,
            laborantLastName: laborantLastName,
            hospitalId,
        };

        try {
            await apiClient.put(`/laborants/${laborant.id}`, updatedLaborant);
            alert('Laborant başarıyla güncellendi!');
            onUpdate();
        } catch (error) {
            console.error('Laborant güncellenirken bir hata oluştu:', error);
        }
    };

    return (
        <Box mx="auto" >
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Adı"
                    placeholder="Adı"
                    value={laborantFirstName}
                    onChange={(e) => setLaborantFirstName(e.target.value)}
                    required
                    mb="sm"
                    pattern="[A-Za-zÇçĞğİıÖöŞşÜü]*"
                />
                <TextInput
                    label="Soyadı"
                    placeholder="Soyadı"
                    value={laborantLastName}
                    onChange={(e) => setLaborantLastName(e.target.value)}
                    required
                    mb="sm"
                    pattern="[A-Za-zÇçĞğİıÖöŞşÜü]*"
                />
                <TextInput
                    label="Hastane ID"
                    placeholder="Hastane ID"
                    value={hospitalId}
                    onChange={(e) => setHospitalId(e.target.value)}
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
