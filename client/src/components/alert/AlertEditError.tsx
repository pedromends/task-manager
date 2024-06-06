import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";

export default function AlertEditError() {
  const navigate = useNavigate();
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" action={
        <Button onClick={()=> {
          navigate("/")
				  window.location.reload()
        }}>Ok</Button>
      }>
        Falha ao editar registro
      </Alert>
    </Stack>
  );
}
