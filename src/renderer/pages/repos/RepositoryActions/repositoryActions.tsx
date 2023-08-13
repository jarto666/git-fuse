import { Styles as S } from './styles';

export const RepositoryActionsPanel = () => {
  return (
    <>
      <S.RepositoryActionsPanel>
        <S.RepositoryActionHome>
          <S.HomeIcon></S.HomeIcon>
        </S.RepositoryActionHome>
        <S.RepositoryActionList>
          <S.RepositoryActionListItem>
            <S.PullIcon></S.PullIcon>
            <S.RepositoryActionListItemLabel>
              Pull
            </S.RepositoryActionListItemLabel>
          </S.RepositoryActionListItem>
          <S.RepositoryActionListItem>
            <S.PushIcon></S.PushIcon>
            <S.RepositoryActionListItemLabel>
              Push
            </S.RepositoryActionListItemLabel>
          </S.RepositoryActionListItem>
          <S.RepositoryActionListItem>
            <S.BranchIcon></S.BranchIcon>
            <S.RepositoryActionListItemLabel>
              Branch
            </S.RepositoryActionListItemLabel>
          </S.RepositoryActionListItem>
          <S.RepositoryActionListItem>
            <S.StashIcon></S.StashIcon>
            <S.RepositoryActionListItemLabel>
              Stash
            </S.RepositoryActionListItemLabel>
          </S.RepositoryActionListItem>
          <S.RepositoryActionListItem>
            <S.ResetIcon></S.ResetIcon>
            <S.RepositoryActionListItemLabel>
              Reset
            </S.RepositoryActionListItemLabel>
          </S.RepositoryActionListItem>
        </S.RepositoryActionList>
      </S.RepositoryActionsPanel>
    </>
  );
};
