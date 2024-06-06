import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";

export default function SignUpError() {
  const navigate = useNavigate();
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
        Email já está sendo utilizado ou senha fraca
      </Alert>
    </Stack>
  );
}
