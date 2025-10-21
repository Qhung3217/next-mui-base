import type { AccordionProps } from '@mui/material/Accordion';
import type { AccordionDetailsProps } from '@mui/material/AccordionDetails';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';

import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { Iconify } from 'src/components/iconify';

type FormAccordionProps = AccordionProps;
export const FormAccordion = ({ sx, children, ...props }: FormAccordionProps) => (
  <Accordion
    {...props}
    sx={{
      boxShadow: 'none !important',
      border: '1px solid #e0e0e0',
      borderRadius: 1,
      '&::before': { display: 'none' },
      ...sx,
    }}
  >
    {children}
  </Accordion>
);

type FormAccordionSummaryProps = AccordionSummaryProps & {
  label?: string;
};

export const FormAccordionSummary = ({
  label,
  sx,
  children,
  ...props
}: FormAccordionSummaryProps) => (
  <AccordionSummary
    expandIcon={<Iconify icon="lucide:chevron-up" />}
    {...props}
    sx={{
      p: 1.5,
      alignItems: 'center',
      '& .MuiAccordionSummary-content': {
        my: 0,
      },
      ...sx,
    }}
  >
    {children ?? <Typography variant="subtitle2">{label || 'AccordionSummary'}</Typography>}
  </AccordionSummary>
);

type FormAccordionDetailsProps = AccordionDetailsProps;
export const FormAccordionDetails = ({ sx, children, ...props }: FormAccordionDetailsProps) => (
  <AccordionDetails
    sx={{
      pt: '0 !important',
      ...sx,
    }}
    {...props}
  >
    {children}
  </AccordionDetails>
);

const FormGroupAccordion = {
  Accordion: FormAccordion,
  Summary: FormAccordionSummary,
  Details: FormAccordionDetails,
};

export default FormGroupAccordion;
