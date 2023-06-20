import { Link } from 'react-router-dom';
import { AppBar, Box, Container, Toolbar, Typography, Button } from '@mui/material';

type Page = {
  name: string;
  path: string;
}

export const Header = () => {
  const pages: Page[] = [
    { name: '新規作成', path: '/create' },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth='md'>
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Scheduler
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex'}}>
            {pages.map((page) => (
              <Link to={page.path} key={page.name} style={{ textDecoration: 'none' }}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
