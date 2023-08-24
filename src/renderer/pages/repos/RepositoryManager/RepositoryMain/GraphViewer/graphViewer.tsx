import React from 'react';
import { useEffect, useRef } from 'react';
import { IGitCommit } from 'shared/interfaces/IGitGraph';

const valueToColorHex = (value: number): string => {
  // Define the number of distinct colors
  const numColors: number = 10;

  // Calculate the hue value based on the provided value and number of colors
  const hue: number = (value % numColors) * (360 / numColors);

  function hueToRgb(t: number): number {
    const p: number = 0.8; // You can adjust this value for different shades
    const q: number = 0.2; // You can adjust this value for different shades

    t = t - Math.floor(t);

    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  const r: number = hueToRgb(hue / 360);
  const g: number = hueToRgb(hue / 360 + 1 / 3);
  const b: number = hueToRgb(hue / 360 - 1 / 3);

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number): string =>
    `#${Math.round(r * 255)
      .toString(16)
      .padStart(2, '0')}${Math.round(g * 255)
      .toString(16)
      .padStart(2, '0')}${Math.round(b * 255)
      .toString(16)
      .padStart(2, '0')}`;

  const colorHex: string = rgbToHex(r, g, b);

  return colorHex;
};

interface Point {
  x: number;
  y: number;
}

class Vertex {
  static readonly OFFSET_X_GAP: number = 5;
  static readonly RADIUS: number = 5;
  static readonly LINE_HEIGHT: number = 20;

  id: string;
  color: string;
  position: Point;
  level: number;

  constructor(level: number, sequence: number, id: string) {
    this.level = level;
    this.color = valueToColorHex(level);
    this.id = id;

    const offsetX =
      Vertex.OFFSET_X_GAP + level * (Vertex.OFFSET_X_GAP + Vertex.RADIUS * 2);
    const offsetY =
      sequence * Vertex.LINE_HEIGHT + (Vertex.LINE_HEIGHT / 2 - Vertex.RADIUS);
    this.position = { x: offsetX + Vertex.RADIUS, y: offsetY + Vertex.RADIUS };
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) return;

    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      Vertex.RADIUS,
      0,
      Math.PI * 2
    );
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }
}

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

const getNodes = (commits: IGitCommit[]): GraphNode[] => {
  let maxLevel = 0;
  const parentChildrenMap: Record<string, GraphNode[]> = {};
  const nodeList: GraphNode[] = [];
  const levelMap: (IGitCommit | undefined)[] = Array(100).fill(undefined);
  for (const commit of commits) {
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
          levelMap[i]!.parentIds.every(
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
      commit: commit,
      level: newLevel,
    };

    for (const parentId of commit.parentIds)
      parentChildrenMap[parentId] = [
        ...(parentChildrenMap[parentId] ?? []),
        newNode,
      ];

    nodeList.push(newNode);
  }

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

  return (
    <canvas
      //   style={{ borderRight: '1px solid white' }}
      ref={canvasRef}
      width={1200}
      height={22000}
    />
  );
};

type GraphViewerProps = {
  commits: IGitCommit[];
};

export const GraphViewer = (props: GraphViewerProps) => {
  const { commits } = props;

  if (!commits) {
    return <div>----</div>;
  }

  const commitNodes = getNodes(commits);

  const commitVertexMap: Record<string, Vertex> = Object.fromEntries(
    commitNodes.map((node, i) => [
      node.commit.id,
      new Vertex(node.level, i, node.commit.id),
    ])
  );

  const edges: Edge[] = commitNodes
    .flatMap((commitNode) => {
      const childHash = commitNode.commit.id;
      const childVertex = commitVertexMap[childHash];
      const parentIds = commitNode.commit.parentIds;
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

  return (
    <GraphCanvas>
      {(context) => {
        for (const edge of edges) {
          edge.draw(context);
        }
        for (const commitId in commitVertexMap) {
          commitVertexMap[commitId].draw(context);
        }
      }}
    </GraphCanvas>
  );
};
