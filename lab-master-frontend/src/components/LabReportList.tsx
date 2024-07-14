import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, rem, Button, Loader } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import apiClient from '../http-common';
import UpdateLabReportForm from '../components/UpdateLabReportForm';
import classes from '../css/TableSort.module.css';

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
    laborantId: number;
    laborant?: Laborant;  // Laborant bilgisi eklenebilir
}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
}

function filterData(data: LabReport[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        Object.keys(item).some((key) =>
            String(item[key as keyof LabReport]).toLowerCase().includes(query)
        )
    );
}

function sortData(
    data: LabReport[],
    payload: { sortBy: keyof LabReport | null; reversed: boolean; search: string }
) {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return String(b[sortBy]).localeCompare(String(a[sortBy]));
            }

            return String(a[sortBy]).localeCompare(String(b[sortBy]));
        }),
        payload.search
    );
}

const LabReportList: React.FC = () => {
    const [labReports, setLabReports] = useState<LabReport[]>([]);
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState<LabReport[]>([]);
    const [sortBy, setSortBy] = useState<keyof LabReport | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [editingLabReportId, setEditingLabReportId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchLabReports();
    }, []);

    const fetchLabReports = async () => {
        try {
            const response = await apiClient.get('/labreports');
            const labReports: LabReport[] = response.data;

            // Laborant bilgilerini al ve raporlarla birleştir
            const updatedLabReports = await Promise.all(labReports.map(async (report) => {
                const laborantResponse = await apiClient.get(`/laborants/${report.laborantId}`);
                return { ...report, laborant: laborantResponse.data };
            }));

            setLabReports(updatedLabReports);
            setSortedData(updatedLabReports);
            setLoading(false);
        } catch (error) {
            console.error('Raporları yüklenirken bir hata oluştu : ', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/labreports/${id}`);
            alert('Rapor başarıyla silindi!');
            fetchLabReports();
        } catch (error) {
            console.error('Rapor silinirken bir hata oluştu:', error);
        }
    };

    const setSorting = (field: keyof LabReport) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(labReports, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(labReports, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const handleEdit = (id: number) => {
        setEditingLabReportId(id);
    };

    const handleUpdateSuccess = () => {
        setEditingLabReportId(null);
        fetchLabReports();
    };

    const handleCancelEdit = () => {
        setEditingLabReportId(null);
    };

    const rows = sortedData.map((labReport) => (
        <React.Fragment key={labReport.id}>
            <Table.Tr>
                <Table.Td>{labReport.fileNumber}</Table.Td>
                <Table.Td>{labReport.patientName}</Table.Td>
                <Table.Td>{labReport.patientSurname}</Table.Td>
                <Table.Td>{labReport.patientId}</Table.Td>
                <Table.Td>{labReport.diagnosisTitle}</Table.Td>
                <Table.Td>{labReport.diagnosisDetails}</Table.Td>
                <Table.Td>{labReport.reportDate}</Table.Td>
                <Table.Td>
                    {labReport.laborant
                        ? `${labReport.laborant.laborantFirstName} ${labReport.laborant.laborantLastName}`
                        : 'Laborant bilgisi eksik'}
                </Table.Td>
                <Table.Td>
                    <Group style={{ padding: '5px' }}>
                        <Button color="blue" onClick={() => handleEdit(labReport.id)}>
                            Güncelle
                        </Button>
                        <Button color="red" onClick={() => handleDelete(labReport.id)} >
                            Sil
                        </Button>
                        <Button color="green" component={Link} to={`/labreports/${labReport.id}`}>
                            Detaylar
                        </Button>
                    </Group>
                </Table.Td>
            </Table.Tr>
            {editingLabReportId === labReport.id && (
                <Table.Tr>
                    <Table.Td colSpan={9}>
                        <UpdateLabReportForm
                            labReport={labReport}
                            onUpdate={handleUpdateSuccess}
                            onCancel={handleCancelEdit}
                        />
                    </Table.Td>
                </Table.Tr>
            )}
        </React.Fragment>
    ));

    return (
        <ScrollArea>
            <h2>Rapor Listesi</h2>
            <TextInput
                placeholder="Rapor Ara"
                mb="md"
                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table horizontalSpacing="xs" verticalSpacing="xs" miw={700} layout="auto">
                <Table.Tbody>
                    <Table.Tr>
                        <Th
                            sorted={sortBy === 'fileNumber'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('fileNumber')}
                        >
                            Dosya Numarası
                        </Th>
                        <Th
                            sorted={sortBy === 'patientName'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('patientName')}
                        >
                            Hasta Adı
                        </Th>
                        <Th
                            sorted={sortBy === 'patientSurname'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('patientSurname')}
                        >
                            Hasta Soyadı
                        </Th>
                        <Th
                            sorted={sortBy === 'patientId'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('patientId')}
                        >
                            T.C. Kimlik Numarası
                        </Th>
                        <Th
                            sorted={sortBy === 'diagnosisTitle'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('diagnosisTitle')}
                        >
                            Teşhis Başlığı
                        </Th>
                        <Th
                            sorted={sortBy === 'diagnosisDetails'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('diagnosisDetails')}
                        >
                            Teşhis Detayları
                        </Th>
                        <Th
                            sorted={sortBy === 'reportDate'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('reportDate')}
                        >
                            Rapor Tarihi
                        </Th>
                        <Th
                            sorted={false}
                            reversed={reverseSortDirection}
                            onSort={() => { }}
                        >
                            Laborant Adı Soyadı
                        </Th>
                        <Th sorted={false} reversed={false} onSort={() => { }}>
                            İşlem
                        </Th>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {loading ? (
                        <Table.Tr>
                            <Table.Td colSpan={9} align="center">
                                <Loader size="sm" />
                            </Table.Td>
                        </Table.Tr>
                    ) : rows.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={9}>
                                <Text fw={500} ta="center">
                                    Rapor Bulunamadı
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
};

export default LabReportList;
