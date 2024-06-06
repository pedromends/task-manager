import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";

export default function AlertEdit() {
  const navigate = useNavigate();
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success" action={
        <Button onClick={()=> {
          navigate("/")
				  window.location.reload()
        }}>Ok</Button>
      }>
        Sucesso ao aplicar mudanças
      </Alert>
    </Stack>
  );
}
