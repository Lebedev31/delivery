import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery } from '@mui/material';

function PhoneMenu({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  const isMobile = useMediaQuery('(max-width:450px)');
  return (
    <>
      {isMobile ? (
        <Accordion
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.07)',
          }}
        >
          <AccordionSummary
            className="menu__accordionSummary"
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={
              <ExpandMoreIcon
                style={{
                  color: 'rgba(153, 153, 153, 1)',
                }}
              />
            }
          >
            <h3 className="menu__title">{text}</h3>
          </AccordionSummary>

          <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
      ) : (
        children
      )}
    </>
  );
}

export default PhoneMenu;
