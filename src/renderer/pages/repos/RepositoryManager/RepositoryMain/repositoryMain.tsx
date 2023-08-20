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
        <>jvbnkml</>
      )}
    </div>
  );
};
