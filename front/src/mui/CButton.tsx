import { Button } from '@mui/material';

export default function CButton({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Button
                variant="contained"
                sx={{
                    width: 30,
                    height: 30,
                    minWidth: '30px',
                }}
                color="secondary"
            >
                {children}
            </Button>
        </div>
    );
}
