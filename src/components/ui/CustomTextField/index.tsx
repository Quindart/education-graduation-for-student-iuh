import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';

interface CustomTextFieldProps extends StandardTextFieldProps {
  label?: string | React.ReactNode;
}
export default function CustomTextField(props: CustomTextFieldProps) {
  const { id, label, required, size = 'small', ...rest } = props;
  return (
    <Box mb={8} component='fieldset'>
      {label && (
        <InputLabel htmlFor={id} sx={{ mb: 4, color: 'grey.900', fontSize: 14, fontWeight: 600 }}>
          {label}
          {required && <span style={{ color: 'red', marginLeft: 2 }}>*</span>}
        </InputLabel>
      )}
      <TextField variant='outlined' id={id} fullWidth size={size} {...rest} />
    </Box>
  );
}
