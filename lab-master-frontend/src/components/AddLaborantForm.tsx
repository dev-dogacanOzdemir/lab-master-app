import React, { useState } from 'react';
import { TextInput, Button, Box, Group } from '@mantine/core';
import apiClient from '../http-common';
import '@mantine/dates/styles.css'
const AddLaborant: React.FC = () => {
    const [laborantFirstName, setLaborantFirstName] = useState('');
    const [laborantLastName, setLaborantLastName] = useState('');
    const [hospitalId, setHospitalId] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newLaborant = {
            laborantFirstName: laborantFirstName,
            laborantLastName: laborantLastName,
            hospitalId,
        };

        try {
            const response = await apiClient.post('/laborants', newLaborant);
            if (response.status === 200) {
                alert('Laborant başarıyla eklendi!');
                setLaborantFirstName('');
                setLaborantLastName('');
                setHospitalId('');
            } else {
                console.error('Laborant eklenirken bir hata oluştu:', response);
            }
        } catch (error) {
            console.error('Laborant eklenirken bir hata oluştu:', error);
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
                    pattern="\d*"
                    maxLength={7}
                    minLength={7}
                />
                <Group mt="md">
                    <Button type="submit">Ekle</Button>
                </Group>
            </form>
        </Box>
    );
};

export default AddLaborant;
