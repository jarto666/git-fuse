interface RepositoryContentProps {
  children: React.ReactNode;
}

const RepositoryContent = (props: RepositoryContentProps) => {
  return <>{props.children}</>;
};

export default RepositoryContent;
