import { useSelector } from 'react-redux';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';

export type RepositoryMainPanelProps = {};

type Props = RepositoryMainPanelProps & React.ComponentPropsWithoutRef<'div'>;

export const RepositoryMainPanel = (props: Props) => {
  const selectedRepoState = useSelector<any, SelectedRepoStateInterface>(
    (state: any) => state.selectedRepository
  );

  return (
    <div {...props}>
      {selectedRepoState.error ? (
        <span>Error: {selectedRepoState.error.message}</span>
      ) : (
        <>
          <span>Path: {selectedRepoState.repo?.path}</span>
          <ul>
            Local branches:
            {selectedRepoState.repo?.branches.local.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <ul>
            Remote branches:
            {selectedRepoState.repo?.branches.remote.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <ul>
            Stashes:
            {selectedRepoState.repo?.stashes.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
  return <div {...props}>{selectedRepoState.repo?.path}</div>;
};