import { SplitProps } from '@uiw/react-split';
import { Styles as S } from './styles';
import { useSelector } from 'react-redux';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';
import StyledSplit from 'renderer/framework/Split/StyledSplit';

export type RepositoryManagerProps = {} & SplitProps;

export const RepositoryManager = (props: RepositoryManagerProps) => {
  const selectedRepoState = useSelector<any, SelectedRepoStateInterface>(
    (state: any) => state.selectedRepository
  );

  if (selectedRepoState.error) {
    return (
      <div className={props.className}>{selectedRepoState.error.message}</div>
    );
  }

  return (
    <StyledSplit {...props} lineBar style={{ width: '100%' }}>
      <S.DataPanel />
      <S.MainPanel />
    </StyledSplit>
  );
};
