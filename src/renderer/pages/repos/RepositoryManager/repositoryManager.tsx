import Split, { SplitProps } from '@uiw/react-split';
import { Styles as S } from './styles';

export type RepositoryManagerProps = {} & SplitProps;

export const RepositoryManager = (props: RepositoryManagerProps) => {
  return (
    <Split {...props} lineBar>
      <S.DataPanel />
      <S.RepositoryView />
    </Split>
  );
};
