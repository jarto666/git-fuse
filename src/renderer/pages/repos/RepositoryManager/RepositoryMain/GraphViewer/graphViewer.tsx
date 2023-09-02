import React, { useMemo, useEffect, useRef } from 'react';
import { IGitCommit } from 'shared/interfaces/IGitGraph';
import Vertex from './Vertex';

class Edge {
  from: Vertex;
  to: Vertex;
  color: string;
  type: string;

  constructor(from: Vertex, to: Vertex, type: 'top' | 'bottom') {
    this.from = from;
    this.to = to;
    this.color = type === 'top' ? from.color : to.color;
    this.type = type;
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) return;

    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = 2;

    context.moveTo(this.from.position.x, this.from.position.y);

    context.lineJoin = 'round';

    if (this.from.position.x === this.to.position.x) {
      context.lineTo(this.to.position.x, this.to.position.y);
    } else if (this.type === 'top') {
      // MERGE
      context.lineTo(this.from.position.x, this.to.position.y + 10);
      context.lineTo(this.to.position.x, this.to.position.y);
    } else {
      // BRANCH
      context.lineTo(this.to.position.x, this.from.position.y - 10);
      context.lineTo(this.to.position.x, this.to.position.y);
    }

    context.lineTo(this.to.position.x, this.to.position.y);
    context.stroke();
  }
}

type GraphNode = { commit: IGitCommit; level: number };

// Version one of the algorithm which tries to stick all nodes to the left
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNodesLeftmost = (commits: IGitCommit[]): GraphNode[] => {
  let maxLevel = 0;
  const parentChildrenMap: Record<string, GraphNode[]> = {};
  const nodeList: GraphNode[] = [];
  const levelMap: (IGitCommit | undefined)[] = Array(100).fill(undefined);
  commits.forEach((commit) => {
    let newLevel;
    const children: GraphNode[] = parentChildrenMap[commit.id];
    const childrenWhereCommitIsFirstParent =
      children &&
      children.filter(
        (x) => x.commit.parentIds.findIndex((pId) => pId === commit.id) === 0
      );
    const leftmostChild =
      childrenWhereCommitIsFirstParent &&
      childrenWhereCommitIsFirstParent.reduce((prev, cur) => {
        if (cur.level < prev.level) {
          return cur;
        }
        return prev;
      }, childrenWhereCommitIsFirstParent[0]);

    if (leftmostChild) {
      newLevel = leftmostChild.level;
      levelMap[newLevel] = commit;
      for (let i = maxLevel - 1; i > 0; i--) {
        if (
          levelMap[i]?.parentIds.every(
            (pId) =>
              nodeList.some((x) => x.commit.id === pId) || pId === commit.id
          )
        ) {
          maxLevel--;
          levelMap[i] = undefined;
        } else {
          break;
        }
      }
    } else {
      newLevel = maxLevel++;
      levelMap[newLevel] = commit;
    }

    const newNode = {
      commit,
      level: newLevel,
    };

    commit.parentIds.forEach((parentId) => {
      parentChildrenMap[parentId] = [
        ...(parentChildrenMap[parentId] ?? []),
        newNode,
      ];
    });

    nodeList.push(newNode);
  });

  return nodeList;
};

// Version one of the algorithm which tries to avoid lots of edge bends
const getNodesTopmost = (commits: IGitCommit[]): GraphNode[] => {
  const nodeList: GraphNode[] = [];
  const renderedCommits: Set<string> = new Set<string>();
  const levelMap: (IGitCommit | undefined)[] = Array(100).fill(undefined);
  commits.forEach((commit) => {
    renderedCommits.add(commit.id);

    let newLevel;
    const topmostChild = nodeList.find((x) =>
      x.commit.parentIds.some((pId) => pId === commit.id)
    );

    if (topmostChild && topmostChild.commit.parentIds[0] === commit.id) {
      newLevel = topmostChild.level;
      levelMap[newLevel] = commit;
      for (let i = 0; i < levelMap.length; i++) {
        if (levelMap[i]?.parentIds.every((pId) => renderedCommits.has(pId))) {
          levelMap[i] = undefined;
        }
      }
    } else {
      newLevel = levelMap.indexOf(undefined);
      levelMap[newLevel] = commit;
    }

    const newNode = {
      commit,
      level: newLevel,
    };

    nodeList.push(newNode);
  });

  return nodeList;
};

type GraphCanvasProps = {
  children:
    | ((context: CanvasRenderingContext2D | null) => void)
    | React.ReactNode;
};

const GraphCanvas = (props: GraphCanvasProps) => {
  const { children } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (typeof children === 'function') {
      children(context);
    }
  }, [children]);

  return <canvas ref={canvasRef} width={300} height={22000} />;
};

type GraphViewerProps = {
  commits: IGitCommit[];
};

const GraphViewer = (props: GraphViewerProps) => {
  const { commits } = props;

  const commitNodes = useMemo(() => {
    return getNodesTopmost(commits ?? []);
  }, [commits]);

  const commitVertexMap: Record<string, Vertex> = useMemo(() => {
    return Object.fromEntries(
      commitNodes.map((node, i) => [
        node.commit.id,
        new Vertex(node.level, i, node.commit.id),
      ])
    );
  }, [commitNodes]);

  const edges: Edge[] = useMemo(() => {
    return commitNodes
      .flatMap((commitNode) => {
        const childHash = commitNode.commit.id;
        const childVertex = commitVertexMap[childHash];
        const { parentIds } = commitNode.commit;
        const parentVertices = parentIds.map(
          (parentId) => commitVertexMap[parentId]
        );

        return parentVertices.map(
          (parentVertex) =>
            new Edge(
              parentVertex,
              childVertex,
              parentIds.length > 1 ? 'top' : 'bottom'
            )
        );
      })
      .sort((a, b) => a.to.level - b.to.level);
  }, [commitNodes, commitVertexMap]);

  const GraphCanvasMemo = useMemo(() => {
    return (
      <GraphCanvas>
        {(context) => {
          edges.forEach((edge) => {
            edge.draw(context);
          });

          Object.keys(commitVertexMap).forEach((commitId) => {
            commitVertexMap[commitId].draw(context);
          });
        }}
      </GraphCanvas>
    );
  }, [commitVertexMap, edges]);

  if (!commits) {
    return <div>----</div>;
  }

  return <>{commits ? GraphCanvasMemo : <div>----</div>}</>;
};

export default GraphViewer;
