import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    rem,
    Button,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import apiClient from '../http-common';
import UpdateLaborant from '../components/UpdateLaborantForm';
import classes from '../css/TableSort.module.css';

interface Laborant {
    id: number;
    laborantFirstName: string;
    laborantLastName: string;
    hospitalId: string;
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

function filterData(data: Laborant[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        Object.keys(item).some((key) =>
            String(item[key as keyof Laborant]).toLowerCase().includes(query)
        )
    );
}

function sortData(
    data: Laborant[],
    payload: { sortBy: keyof Laborant | null; reversed: boolean; search: string }
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

const LaborantList: React.FC = () => {
    const [laborants, setLaborants] = useState<Laborant[]>([]);
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState<Laborant[]>([]);
    const [sortBy, setSortBy] = useState<keyof Laborant | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [editingLaborantId, setEditingLaborantId] = useState<number | null>(null);

    useEffect(() => {
        fetchLaborants();
    }, []);

    const fetchLaborants = async () => {
        try {
            const response = await apiClient.get('/laborants');
            setLaborants(response.data);
            setSortedData(response.data);
        } catch (error) {
            console.error('Laborantlar yüklenirken bir hata oluştu : ', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/laborants/${id}`);
            alert('Laborant başarıyla silindi!');
            fetchLaborants();
        } catch (error) {
            console.error('Laborant silinirken bir hata oluştu:', error);
        }
    };

    const setSorting = (field: keyof Laborant) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(laborants, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(laborants, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const handleEdit = (id: number) => {
        setEditingLaborantId(id);
    };

    const handleUpdateSuccess = () => {
        setEditingLaborantId(null);
        fetchLaborants();
    };

    const handleCancelEdit = () => {
        setEditingLaborantId(null);
    };

    const rows = sortedData.map((laborant) => (
        <>
            <Table.Tr key={laborant.id}>
                <Table.Td>{laborant.laborantFirstName}</Table.Td>
                <Table.Td>{laborant.laborantLastName}</Table.Td>
                <Table.Td>{laborant.hospitalId}</Table.Td>
                <Table.Td>
                    <Group>
                        <Button color="blue" onClick={() => handleEdit(laborant.id)} style={{ marginRight: 5 }}>
                            Güncelle
                        </Button>
                        <Button color="red" onClick={() => handleDelete(laborant.id)} style={{ marginRight: 5 }}>
                            Sil
                        </Button>
                        <Button color="green" component={Link} to={`/laborants/${laborant.id}`}>
                            Detaylar
                        </Button>
                    </Group>
                </Table.Td>
            </Table.Tr>
            {editingLaborantId === laborant.id && (
                <Table.Tr key={`edit-${laborant.id}`}>
                    <Table.Td colSpan={4}>
                        <UpdateLaborant
                            laborant={laborant}
                            onUpdate={handleUpdateSuccess}
                            onCancel={handleCancelEdit}
                        />
                    </Table.Td>
                </Table.Tr>
            )}
        </>
    ));

    return (
        <ScrollArea>
            <h2>Laborant Listesi</h2>
            <TextInput
                placeholder="Laborant Ara"
                mb="md"
                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="auto">
                <Table.Tbody>
                    <Table.Tr>
                        <Th
                            sorted={sortBy === 'laborantFirstName'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('laborantFirstName')}
                        >
                            Adı
                        </Th>
                        <Th
                            sorted={sortBy === 'laborantLastName'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('laborantLastName')}
                        >
                            Soyadı
                        </Th>
                        <Th
                            sorted={sortBy === 'hospitalId'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('hospitalId')}
                        >
                            Hastane ID
                        </Th>
                        <Th sorted={false} reversed={false} onSort={() => { }}>
                            İşlem
                        </Th>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={4}>
                                <Text fw={500} ta="center">
                                    Laborant Bulunamadı
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
};

export default LaborantList;
