import {
  StyledRepositoryActionsPanel,
  StyledRepositoryActionList,
  StyledRepositoryActionListItem,
  StyledPullIcon,
  StyledRepositoryActionListItemLabel,
  StyledPushIcon,
  StyledBranchIcon,
  StyledStashIcon,
  StyledResetIcon,
} from './styles';

export const RepositoryActionsPanel = () => {
  return (
    <>
      <StyledRepositoryActionsPanel>
        <StyledRepositoryActionList>
          <StyledRepositoryActionListItem>
            <StyledPullIcon />
            <StyledRepositoryActionListItemLabel>
              Pull
            </StyledRepositoryActionListItemLabel>
          </StyledRepositoryActionListItem>
          <StyledRepositoryActionListItem>
            <StyledPushIcon />
            <StyledRepositoryActionListItemLabel>
              Push
            </StyledRepositoryActionListItemLabel>
          </StyledRepositoryActionListItem>
          <StyledRepositoryActionListItem>
            <StyledBranchIcon />
            <StyledRepositoryActionListItemLabel>
              Branch
            </StyledRepositoryActionListItemLabel>
          </StyledRepositoryActionListItem>
          <StyledRepositoryActionListItem>
            <StyledStashIcon />
            <StyledRepositoryActionListItemLabel>
              Stash
            </StyledRepositoryActionListItemLabel>
          </StyledRepositoryActionListItem>
          <StyledRepositoryActionListItem>
            <StyledResetIcon />
            <StyledRepositoryActionListItemLabel>
              Reset
            </StyledRepositoryActionListItemLabel>
          </StyledRepositoryActionListItem>
        </StyledRepositoryActionList>
      </StyledRepositoryActionsPanel>
    </>
  );
};
