import { Layer, Stage } from "react-konva";
import GridRenderer from "./GridRenderer.tsx";
import useWindowSize from "../../hooks/useWindowSize.ts";
import useSettingsValue from "../../hooks/useSettings.ts";
import FieldImageRenderer from "./FieldImageRenderer.tsx";
import useWindowScaleValue from "../../hooks/useWindowScale.ts";
import PathRenderer from "./PathRenderer.tsx";
import useCanvasMouseCursorValue from "../../hooks/useCanvasMouseCursor.ts";
import AnimationRenderer from "./AnimationRenderer.tsx";
import React from "react";
import { useSetSelectedPoint } from "../../hooks/useSelectPoint.ts";

export default function MainCanvas() {
    const { pixelsPerInch } = useSettingsValue();
    const windowScale = useWindowScaleValue();
    const [windowWidth, windowHeight] = useWindowSize();
    const mouseCursor = useCanvasMouseCursorValue();
    const setSelectedPoint = useSetSelectedPoint();

    const onClick = React.useCallback(() => {
        setSelectedPoint(undefined);
    }, [setSelectedPoint]);

    return (
        <Stage
            style={{
                cursor: mouseCursor,
            }}
            width={windowWidth}
            height={windowHeight}
            perfectDrawEnabled={false}
            onClick={onClick}
        >
            <Layer
                x={windowWidth / 2}
                y={windowHeight / 2}
                scaleX={windowScale}
                scaleY={windowScale}
            >
                <FieldImageRenderer />
                <PathRenderer />
                <AnimationRenderer />
                <GridRenderer
                    cellSize={pixelsPerInch * 12}
                    gridSize={100}
                    color={"#444"}
                />
            </Layer>
        </Stage>
    )
}