interface RepositoryContentProps {
  children: React.ReactNode;
}

const RepositoryContent = (props: RepositoryContentProps) => {
  const { children } = props;

  return <>{children}</>;
};

export default RepositoryContent;
