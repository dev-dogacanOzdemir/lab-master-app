import { Menu, Group, Center, Burger, Container, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './HeaderMenu.module.css';
import { Link, useNavigate } from 'react-router-dom';

const links = [
    { link: '/home', label: 'Ana Sayfa' },
    {
        link: '/reports',
        label: 'Raporlar',
        links: [
            { link: '/add-report', label: 'Rapor Ekle' },
            { link: '/all-reports', label: 'Tüm Raporlar' },
        ],
    },
    {
        link: '/laborants',
        label: 'Laborantlar',
        links: [
            { link: '/add-laborant', label: 'Laborant Ekle' },
            { link: '/all-laborants', label: 'Tüm Laborantlar' },
        ],
    },
];

interface HeaderMenuProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export function HeaderMenu({ setIsAuthenticated }: HeaderMenuProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.link} component={Link} to={item.link}>{item.label}</Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                    <Menu.Target>
                        <Link
                            to={link.link}
                            className={classes.link}
                        >
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                                <IconChevronDown size="0.9rem" stroke={3} />
                            </Center>
                        </Link>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <Link
                key={link.label}
                to={link.link}
                className={classes.link}
            >
                {link.label}
            </Link>
        );
    });

    return (
        <header className={classes.header}>
            <Container size="md">
                <div className={classes.inner}>
                    <img style={{ marginTop: '9px' }} src="./labmasterlogo.ico" />
                    <Group gap={5} visibleFrom="sm">
                        {items}
                        <Button onClick={handleLogout} color="red" ml="auto" variant='light'>
                            Çıkış Yap
                        </Button>
                    </Group>
                    <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                </div>
            </Container>
        </header>
    );
}
