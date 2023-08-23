import { useSelector } from 'react-redux';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';
import { GraphViewer } from './GraphViewer/graphViewer';

export type RepositoryMainPanelProps = {};

type Props = RepositoryMainPanelProps & React.ComponentPropsWithoutRef<'div'>;

export const RepositoryMainPanel = (props: Props) => {
  const selectedRepoState = useSelector<any, SelectedRepoStateInterface>(
    (state: any) => state.selectedRepository
  );

  let commits = selectedRepoState.repo && selectedRepoState.repo.commits;

  if (!commits) {
    return <div></div>;
  }

  return (
    <div {...props}>
      {selectedRepoState.error ? (
        <span>Error: {selectedRepoState.error.message}</span>
      ) : (
        <div>
          <GraphViewer commits={commits}></GraphViewer>
        </div>
      )}
    </div>
  );
};
