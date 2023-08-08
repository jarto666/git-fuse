interface RepositoryContentProps {
  children: React.ReactNode;
}

const RepositoryContent = (props: RepositoryContentProps) => {
  console.log(props.children);
  return <>{props.children}</>;
};

export default RepositoryContent;
