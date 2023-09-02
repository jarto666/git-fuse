import { SplitProps } from '@uiw/react-split';
import { useSelector } from 'react-redux';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';
import StyledSplit from 'renderer/framework/Split/StyledSplit';
import { StyledDataPanel, StyledMainPanel } from './styles';

export type RepositoryManagerProps = SplitProps;

export const RepositoryManager = (props: RepositoryManagerProps) => {
  const selectedRepoState = useSelector<any, SelectedRepoStateInterface>(
    (state: any) => state.selectedRepository
  );

  const { className } = props;

  if (selectedRepoState.error) {
    return <div className={className}>{selectedRepoState.error.message}</div>;
  }

  return (
    <StyledSplit className={className} lineBar style={{ width: '100%' }}>
      <StyledDataPanel />
      <StyledMainPanel />
    </StyledSplit>
  );
};
