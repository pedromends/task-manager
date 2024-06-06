import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";

export default function LoginError() {
  const navigate = useNavigate();
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
        Email já está sendo utilizado
      </Alert>
    </Stack>
  );
}
