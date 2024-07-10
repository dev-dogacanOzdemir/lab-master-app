import { Container, Paper, ThemeIcon, Text } from '@mantine/core';
import { IconReportAnalytics, IconUsersGroup } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { rem } from '@mantine/core'; // Import rem if not already done
import classes from '../css/CartGradient.module.css'; // Import your styles

function YourComponent() {
    const navigate = useNavigate();

    return (
        <Container style={{ marginTop: "55px", marginLeft: '20%', marginRight: '20%', display: 'flex', justifyContent: 'space-between' }}>
            <Paper
                withBorder
                radius="md"
                className={classes.card}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    height: '200px',
                    flex: 1,
                    margin: '0 10px',
                    cursor: 'pointer' // Add cursor pointer to indicate clickability
                }}
                onClick={() => navigate('/all-reports')}
            >
                <ThemeIcon
                    size="xl"
                    radius="md"
                    variant="gradient"
                    gradient={{ deg: 0, from: 'pink', to: 'orange' }}
                >
                    <IconReportAnalytics style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
                </ThemeIcon>
                <Text ta='center' size="xl" fw={500} mt="md">
                    RAPOR
                </Text>
            </Paper>

            <Paper
                withBorder
                radius="md"
                className={classes.card}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    width: '1000px',
                    flex: 1,
                    margin: '0 10px',
                    cursor: 'pointer' // Add cursor pointer to indicate clickability
                }}
                onClick={() => navigate('/all-laborants')}
            >
                <ThemeIcon
                    size="xl"
                    radius="md"
                    variant="gradient"
                    gradient={{ deg: 0, from: 'pink', to: 'orange' }}
                >
                    <IconUsersGroup style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
                </ThemeIcon>
                <Text ta='center' size="xl" fw={500} mt="md">
                    LABORANT
                </Text>
            </Paper>
        </Container>
    );
}

export default YourComponent;
