import { Tab, TabProps, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TabContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: 500,
});

const CloseIconCustom = styled(CloseIcon)((props) => ({
  width: '15px',
  ':hover': {
    color: `${props.theme.palette.secondary.main}`,
  },
}));

interface CloseButtonProps {}

const CloseButton = styled('div')((props: CloseButtonProps) => ({
  display: 'flex',
  marginLeft: '5px',
}));

interface StyledTabProps extends TabProps {
  selected?: boolean;
  onClose: (tabId: string) => void;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab
    {...props}
    label={
      <TabContainer
        onMouseUp={(e) => {
          if (e.button == 1 || (e.button & 2) == 1) {
            e.stopPropagation();
            props.onClose(props.value);
          }
        }}
      >
        <span>{props.label}</span>
        <CloseButton
          onClick={(e) => {
            if (e.button == 1 || (e.button & 2) == 1) {
              return;
            }
            e.stopPropagation();
            props.onClose(props.value);
          }}
        >
          <CloseIconCustom fontSize="small" />
        </CloseButton>
      </TabContainer>
    }
  />
))((props) => ({
  textTransform: 'none',
  marginRight: '1px',
  padding: '5px 15px',
  minHeight: '40px',
  cursor: 'default',
  borderRadius: '10px 10px 0 0',
  backgroundColor: props.selected
    ? `${props.theme.actionArea.background}`
    : `${props.theme.actionArea.disabled}`,
  transition: 'background-color 100ms linear',
  ':hover': {
    backgroundColor: `${props.theme.actionArea.greyedOut}`,
    transition: 'background-color 100ms linear',
  },
}));

export default StyledTab;
